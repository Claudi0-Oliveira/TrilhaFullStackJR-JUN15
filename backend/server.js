const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Sequelize } = require('sequelize');
const Project = require('./models/Project');

const app = express();
const port = 3000;

// Configurações do Sequelize
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite'
});

// Middleware
app.use(cors());  // Permite requisições de outros domínios
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Sincroniza o modelo com o banco de dados
sequelize.sync()
    .then(() => {
        console.log('Banco de dados sincronizado.');
    })
    .catch((err) => {
        console.error('Erro ao sincronizar o banco de dados:', err);
    });

// Rotas da API
app.get('/api/projects', async (req, res) => {
    try {
        const projects = await Project.findAll();
        res.json(projects);
    } catch (error) {
        console.error('Erro ao buscar projetos:', error);
        res.status(500).json({ error: 'Erro ao buscar projetos' });
    }
});

app.post('/api/projects', async (req, res) => {
    const { title, description } = req.body;
    try {
        const project = await Project.create({ title, description });
        res.json(project);
    } catch (error) {
        console.error('Erro ao criar projeto:', error);
        res.status(500).json({ error: 'Erro ao criar projeto' });
    }
});

app.put('/api/projects/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    try {
        const project = await Project.findByPk(id);
        if (project) {
            project.title = title;
            project.description = description;
            await project.save();
            res.json(project);
        } else {
            res.status(404).json({ error: 'Projeto não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao atualizar projeto:', error);
        res.status(500).json({ error: 'Erro ao atualizar projeto' });
    }
});

app.delete('/api/projects/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const project = await Project.findByPk(id);
        if (project) {
            await project.destroy();
            res.json({ message: 'Projeto excluído com sucesso' });
        } else {
            res.status(404).json({ error: 'Projeto não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao excluir projeto:', error);
        res.status(500).json({ error: 'Erro ao excluir projeto' });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
