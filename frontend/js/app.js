document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'http://localhost:3000/api/projects';

    // Seleciona os elementos do DOM
    const addProjectForm = document.getElementById('addProjectForm');
    const projectsTableBody = document.getElementById('projectsTableBody');
    const editModal = document.getElementById('editModal');
    const confirmDeleteModal = document.getElementById('confirmDeleteModal');
    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
    const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');

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
                fetchProjects();
                alert('Projeto adicionado com sucesso!');
            } else {
                console.error('Erro ao adicionar projeto:', response.statusText);
            }
        } catch (error) {
            console.error('Erro ao adicionar projeto:', error);
        }
    });

    // Função para excluir um projeto
    let projectToDeleteId = null;

    projectsTableBody.addEventListener('click', async (event) => {
        if (event.target.classList.contains('delete-btn')) {
            projectToDeleteId = event.target.getAttribute('data-id');
            confirmDeleteModal.style.display = 'block';
        }
    });

    // Confirmar exclusão
    confirmDeleteBtn.addEventListener('click', async () => {
        if (projectToDeleteId) {
            try {
                await fetch(`${apiUrl}/${projectToDeleteId}`, {
                    method: 'DELETE'
                });
                confirmDeleteModal.style.display = 'none';
                fetchProjects();
                projectToDeleteId = null;
                alert('Projeto excluído com sucesso!');
            } catch (error) {
                console.error('Erro ao excluir projeto:', error);
            }
        }
    });

    // Cancelar exclusão
    cancelDeleteBtn.addEventListener('click', () => {
        confirmDeleteModal.style.display = 'none';
        projectToDeleteId = null;
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
            editModal.style.display = 'block';
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
            editModal.style.display = 'none';
            fetchProjects();
            alert('Alterações salvas com sucesso!');
        } catch (error) {
            console.error('Erro ao editar projeto:', error);
        }
    });

    // Função para fechar o modal de edição
    document.querySelector('.close').addEventListener('click', () => {
        editModal.style.display = 'none';
    });

    // Fecha o modal de edição se clicar fora do conteúdo
    window.addEventListener('click', (event) => {
        if (event.target === editModal) {
            editModal.style.display = 'none';
        }
    });

    // Carrega os projetos ao carregar a página
    fetchProjects();
});
