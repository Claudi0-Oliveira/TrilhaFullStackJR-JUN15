// backend/controllers/projectController.js

const Project = require('../models/Project');

// Listar todos os projetos
exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.findAll();
        res.json(projects);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar projetos' });
    }
};

// Criar um novo projeto
exports.createProject = async (req, res) => {
    const { title, description } = req.body;
    try {
        const newProject = await Project.create({ title, description });
        res.status(201).json(newProject);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar projeto' });
    }
};

// Atualizar um projeto
exports.updateProject = async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    try {
        await Project.update({ title, description }, { where: { id } });
        res.json({ message: 'Projeto atualizado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar projeto' });
    }
};

// Deletar um projeto
exports.deleteProject = async (req, res) => {
    const { id } = req.params;
    try {
        await Project.destroy({ where: { id } });
        res.json({ message: 'Projeto deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar projeto' });
    }
};
