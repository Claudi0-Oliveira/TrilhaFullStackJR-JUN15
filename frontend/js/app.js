document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'http://localhost:3000/api/projects';

    // Seleciona os elementos do DOM
    const addProjectForm = document.getElementById('addProjectForm');
    const projectsTableBody = document.getElementById('projectsTableBody');
    const successMessage = document.getElementById('successMessage');

    // Função para buscar e exibir os projetos
    const fetchProjects = async () => {
        try {
            const response = await fetch(apiUrl);
            const projects = await response.json();
            projectsTableBody.innerHTML = '';
            projects.forEach(project => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${project.title}</td>
                    <td>${project.description}</td>
                    <td>
                        <button data-id="${project.id}" class="edit-btn">Editar</button>
                        <button data-id="${project.id}" class="delete-btn">Excluir</button>
                    </td>
                `;
                projectsTableBody.appendChild(row);
            });
        } catch (error) {
            console.error('Erro ao buscar projetos:', error);
        }
    };

    // Função para adicionar um novo projeto
    addProjectForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, description })
            });
            if (response.ok) {
                addProjectForm.reset();
                successMessage.style.display = 'block';
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 3000);
                fetchProjects();
            } else {
                console.error('Erro ao adicionar projeto:', response.statusText);
            }
        } catch (error) {
            console.error('Erro ao adicionar projeto:', error);
        }
    });

    // Função para excluir um projeto
    projectsTableBody.addEventListener('click', async (event) => {
        if (event.target.classList.contains('delete-btn')) {
            const id = event.target.getAttribute('data-id');
            try {
                await fetch(`${apiUrl}/${id}`, {
                    method: 'DELETE'
                });
                fetchProjects();
            } catch (error) {
                console.error('Erro ao excluir projeto:', error);
            }
        }
    });

    // Função para editar um projeto
    projectsTableBody.addEventListener('click', (event) => {
        if (event.target.classList.contains('edit-btn')) {
            const id = event.target.getAttribute('data-id');
            const title = event.target.closest('tr').querySelector('td:nth-child(1)').textContent;
            const description = event.target.closest('tr').querySelector('td:nth-child(2)').textContent;
            document.getElementById('editProjectId').value = id;
            document.getElementById('editTitle').value = title;
            document.getElementById('editDescription').value = description;
            document.getElementById('editModal').style.display = 'block';
        }
    });

    // Função para salvar alterações do projeto
    document.getElementById('editProjectForm').addEventListener('submit', async (event) => {
        event.preventDefault();
        const id = document.getElementById('editProjectId').value;
        const title = document.getElementById('editTitle').value;
        const description = document.getElementById('editDescription').value;

        try {
            await fetch(`${apiUrl}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, description })
            });
            document.getElementById('editModal').style.display = 'none';
            fetchProjects();
        } catch (error) {
            console.error('Erro ao editar projeto:', error);
        }
    });

    // Função para fechar o modal
    document.querySelector('.close').addEventListener('click', () => {
        document.getElementById('editModal').style.display = 'none';
    });

    // Fecha o modal se clicar fora do conteúdo
    window.addEventListener('click', (event) => {
        if (event.target === document.getElementById('editModal')) {
            document.getElementById('editModal').style.display = 'none';
        }
    });

    // Carrega os projetos ao carregar a página
    fetchProjects();
});
