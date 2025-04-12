const express = require('express');
const router = express.Router();

const { createUser, getUsers, getUser, updateUser, deleteUser, logIn, getCurrentUser } = require('./user.controller');
const { authenticateAdminAccess, authenticateAccess } = require('../src/middleware/auth.middleware');


router.post('/create', authenticateAdminAccess, createUser);  
router.get('/', authenticateAdminAccess, getUsers);             
router.get('/currentUser', authenticateAccess, getCurrentUser);        
router.get('/:userId', authenticateAdminAccess, getUser);
router.put('/:userId', authenticateAdminAccess, updateUser);     
router.delete('/:userId', authenticateAdminAccess, deleteUser);  
router.post('/login', logIn);

module.exports = router;
