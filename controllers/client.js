// const Client = require('../models/client');
// const Task = require('../models/task');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

// const clientLoginPage = (req, res) => {
//     res.render('client/clientlogin', { errMsg: null });
// };

// const clientLogin = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const client = await Client.findOne({ email });
//         if (!client) return res.render('client/clientlogin', { errMsg: 'Invalid email or password' });
//         const isMatch = await bcrypt.compare(password, client.password);
//         if (!isMatch) return res.render('client/clientlogin', { errMsg: 'Invalid email or password' });
//         const token = jwt.sign({ id: client._id, role: 'client' }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
//         res.cookie('jwt', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
//         res.redirect('/api/client/home');
//     } catch (err) {
//         console.error(err);
//         res.render('client/clientlogin', { errMsg: 'Server error' });
//     }
// };

// const clientRegisterPage = (req, res) => {
//     res.render('client/clientregister', { errMsg: null });
// };

// const clientRegister = async (req, res) => {
//     try {
//         const { name, email, phone, password, address } = req.body;
//         const existingClient = await Client.findOne({ email });
//         if (existingClient) return res.render('client/clientregister', { errMsg: 'Email already registered' });
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const client = new Client({
//             name,
//             email,
//             phone,
//             password: hashedPassword,
//             address,
//         });
//         await client.save();
//         res.redirect('/api/client/login');
//     } catch (err) {
//         console.error(err);
//         res.render('client/clientregister', { errMsg: 'Server error' });
//     }
// };

// const getClientHome = async (req, res) => {
//     try {
//         const tasks = await Task.find({ clientID: req.clientID });
//         res.render('client/clienthome', { tasks });
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Server error');
//     }
// };

// const getClientProfile = async (req, res) => {
//     try {
//         const client = await Client.findById(req.clientID);
//         res.render('client/clientprofile', { user: client });
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Server error');
//     }
// };

// const updateClientProfile = async (req, res) => {
//     try {
//         const { name, phone, address } = req.body;
//         await Client.findByIdAndUpdate(req.clientID, { name, phone, address });
//         res.redirect('/api/client/profile');
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Server error');
//     }
// };

// const getClientTasks = async (req, res) => {
//     try {
//         const tasks = await Task.find({ clientID: req.clientID });
//         res.render('client/clienttasks', { tasks });
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Server error');
//     }
// };

// const createTask = async (req, res) => {
//     try {
//         const { title, description, categoryID, budget } = req.body;
//         const task = new Task({
//             title,
//             description,
//             categoryID,
//             budget,
//             clientID: req.clientID,
//             status: 'open',
//         });
//         await task.save();
//         res.redirect('/api/client/task');
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Server error');
//     }
// };

// const getTaskDetails = async (req, res) => {
//     try {
//         const task = await Task.findById(req.params.taskID).populate('intrestedWorkers', 'name');
//         res.render('client/clienttaskdetails', { task });
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Server error');
//     }
// };

// const assignTask = async (req, res) => {
//     try {
//         const { workerID } = req.body;
//         await Task.findByIdAndUpdate(req.params.taskID, {
//             assignedWorker: workerID,
//             status: 'in-progress',
//         });
//         res.redirect('/api/client/task');
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Server error');
//     }
// };

// const getClientNotifications = async (req, res) => {
//     try {
//         const tasks = await Task.find({ clientID: req.clientID });
//         res.render('client/clientnotifications', { tasks });
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Server error');
//     }
// };

// const clientLogout = (req, res) => {
//     res.clearCookie('jwt');
//     res.redirect('/api/client/login');
// };

// module.exports = {
//     clientLoginPage,
//     clientLogin,
//     clientRegisterPage,
//     clientRegister,
//     getClientHome,
//     getClientProfile,
//     updateClientProfile,
//     getClientTasks,
//     createTask,
//     getTaskDetails,
//     assignTask,
//     getClientNotifications,
//     clientLogout,
// };

// const Client = require('../models/client');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

// const clientLoginPage = (req, res) => {
//     res.render('client/clientlogin', { errMsg: null });
// };

// const clientLogin = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const client = await Client.findOne({ email });
//         if (!client) {
//             return res.render('client/clientlogin', { errMsg: 'Invalid email or password' });
//         }
//         const isMatch = await bcrypt.compare(password, client.password);
//         if (!isMatch) {
//             return res.render('client/clientlogin', { errMsg: 'Invalid email or password' });
//         }
//         const token = jwt.sign({ id: client._id, role: 'client' }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
//         res.cookie('jwt', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
//         res.redirect('/api/client/home');
//     } catch (err) {
//         console.error('Client login error:', err);
//         res.render('client/clientlogin', { errMsg: 'Server error' });
//     }
// };

// const clientRegisterPage = (req, res) => {
//     res.send('Client Register Page'); // Placeholder; replace with res.render if you have a register view
// };

// const clientRegister = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const newClient = new Client({ email, password: hashedPassword });
//         await newClient.save();
//         res.send('Client Registered'); // Placeholder; redirect or render as needed
//     } catch (err) {
//         console.error('Client register error:', err);
//         res.send('Registration failed');
//     }
// };

// const getClientHome = (req, res) => {
//     res.send('Welcome to Client Home'); // Placeholder; replace with res.render if needed
// };

// const getClientProfile = (req, res) => {
//     res.send('Client Profile'); // Placeholder
// };

// const updateClientProfile = (req, res) => {
//     res.send('Profile Updated'); // Placeholder
// };

// const getPostTask = (req, res) => {
//     res.send('Post Task Page'); // Placeholder; replace with res.render if you have a posttask view
// };

// const postTask = (req, res) => {
//     res.send('Task Posted'); // Placeholder
// };

// const getClientRequests = (req, res) => {
//     res.send('Client Requests'); // Placeholder
// };

// const getClientNotifications = (req, res) => {
//     res.send('Client Notifications'); // Placeholder
// };

// const clientLogout = (req, res) => {
//     res.clearCookie('jwt');
//     res.redirect('/api/client/login');
// };

// module.exports = {
//     clientLoginPage,
//     clientLogin,
//     clientRegisterPage,
//     clientRegister,
//     getClientHome,
//     getClientProfile,
//     updateClientProfile,
//     getPostTask, // Added to fix the error
//     postTask,
//     getClientRequests,
//     getClientNotifications,
//     clientLogout
// };

// const Client = require('../models/client');
// const Task = require('../models/task'); // Import your Task model
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

// const clientLoginPage = (req, res) => {
//     res.render('client/clientlogin', { errMsg: null });
// };

// const clientLogin = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const client = await Client.findOne({ email });
//         if (!client) {
//             return res.render('client/clientlogin', { errMsg: 'Invalid email or password' });
//         }
//         const isMatch = await bcrypt.compare(password, client.password);
//         if (!isMatch) {
//             return res.render('client/clientlogin', { errMsg: 'Invalid email or password' });
//         }
//         const token = jwt.sign({ id: client._id, role: 'client' }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
//         res.cookie('jwt', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
//         res.redirect('/api/client/home');
//     } catch (err) {
//         console.error('Client login error:', err);
//         res.render('client/clientlogin', { errMsg: 'Server error' });
//     }
// };

// const clientRegisterPage = (req, res) => {
//     res.send('Client Register Page'); // Placeholder; replace with res.render if you have a register view
// };

// const clientRegister = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const newClient = new Client({ email, password: hashedPassword });
//         await newClient.save();
//         res.send('Client Registered'); // Placeholder; redirect or render as needed
//     } catch (err) {
//         console.error('Client register error:', err);
//         res.send('Registration failed');
//     }
// };

// const getClientHome = async (req, res) => {
//     try {
//         const clientID = req.clientID; // From auth middleware
//         const tasks = await Task.find({ clientID }); // Fetch tasks for this client
//         res.render('client/client_home', { tasks }); // Render with tasks
//     } catch (err) {
//         console.error('Error fetching client home:', err);
//         res.render('client/client_home', { tasks: [] }); // Render with empty array on error
//     }
// };

// const getClientProfile = (req, res) => {
//     res.send('Client Profile'); // Placeholder
// };

// const updateClientProfile = (req, res) => {
//     res.send('Profile Updated'); // Placeholder
// };

// const getPostTask = (req, res) => {
//     res.send('Post Task Page'); // Placeholder; replace with res.render if you have a posttask view
// };

// const postTask = (req, res) => {
//     res.send('Task Posted'); // Placeholder
// };

// const getClientRequests = (req, res) => {
//     res.send('Client Requests'); // Placeholder
// };

// const getClientNotifications = (req, res) => {
//     res.send('Client Notifications'); // Placeholder
// };

// const clientLogout = (req, res) => {
//     res.clearCookie('jwt');
//     res.redirect('/api/client/login');
// };

// module.exports = {
//     clientLoginPage,
//     clientLogin,
//     clientRegisterPage,
//     clientRegister,
//     getClientHome,
//     getClientProfile,
//     updateClientProfile,
//     getPostTask,
//     postTask,
//     getClientRequests,
//     getClientNotifications,
//     clientLogout
// };

// const Client = require('../models/client');
// const Task = require('../models/task');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

// const clientLoginPage = (req, res) => {
//     res.render('client/clientlogin', { errMsg: null });
// };

// const clientLogin = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const client = await Client.findOne({ email });
//         if (!client) {
//             return res.render('client/clientlogin', { errMsg: 'Invalid email or password' });
//         }
//         const isMatch = await bcrypt.compare(password, client.password);
//         if (!isMatch) {
//             return res.render('client/clientlogin', { errMsg: 'Invalid email or password' });
//         }
//         const token = jwt.sign({ id: client._id, role: 'client' }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
//         res.cookie('jwt', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
//         res.redirect('/api/client/home');
//     } catch (err) {
//         console.error('Client login error:', err);
//         res.render('client/clientlogin', { errMsg: 'Server error' });
//     }
// };

// const clientRegisterPage = (req, res) => {
//     res.send('Client Register Page'); // Placeholder; replace with res.render if you have a register view
// };

// const clientRegister = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const newClient = new Client({ email, password: hashedPassword });
//         await newClient.save();
//         res.send('Client Registered'); // Placeholder; redirect or render as needed
//     } catch (err) {
//         console.error('Client register error:', err);
//         res.send('Registration failed');
//     }
// };

// const getClientHome = async (req, res) => {
//     try {
//         const clientID = req.clientID;
//         const tasks = await Task.find({ clientID });
//         res.render('client/client_home', { tasks });
//     } catch (err) {
//         console.error('Error fetching client home:', err);
//         res.render('client/client_home', { tasks: [] });
//     }
// };

// const getClientProfile = async (req, res) => {
//     try {
//         const clientID = req.clientID;
//         const client = await Client.findById(clientID).select('-password'); // Exclude password
//         if (!client) throw new Error('Client not found');
//         console.log('Rendering client_profile with client:', client);
//         res.render('client/client_profile', { client });
//     } catch (err) {
//         console.error('Error fetching client profile:', err);
//         res.render('client/client_profile', { client: null, error: 'Unable to load profile' });
//     }
// };

// const updateClientProfile = async (req, res) => {
//     try {
//         const clientID = req.clientID;
//         const updates = req.body; // e.g., { email }
//         if (updates.password) {
//             updates.password = await bcrypt.hash(updates.password, 10);
//         }
//         const client = await Client.findByIdAndUpdate(clientID, updates, { new: true }).select('-password');
//         res.render('client/client_profile', { client, success: 'Profile updated successfully' });
//     } catch (err) {
//         console.error('Error updating client profile:', err);
//         res.render('client/client_profile', { client: null, error: 'Failed to update profile' });
//     }
// };

// const getPostTask = (req, res) => {
//     res.send('Post Task Page'); // Placeholder; replace with res.render if you have a posttask view
// };

// const postTask = (req, res) => {
//     res.send('Task Posted'); // Placeholder
// };

// const getClientRequests = async (req, res) => {
//     try {
//         const clientID = req.clientID;
//         const tasks = await Task.find({ clientID }); // Assuming "requests" means tasks posted by client
//         console.log('Rendering client_requests with tasks:', tasks);
//         res.render('client/client_requests', { tasks });
//     } catch (err) {
//         console.error('Error fetching client requests:', err);
//         res.render('client/client_requests', { tasks: [], error: 'Unable to load requests' });
//     }
// };

// const getClientNotifications = (req, res) => {
//     // Placeholder: No Notification model provided, using dummy data
//     const notifications = [
//         { id: 1, message: 'A worker is interested in your task "Fix Sink"', date: new Date() },
//         { id: 2, message: 'Your task "Paint Room" is completed', date: new Date() }
//     ];
//     res.render('client/client_notifications', { notifications });
// };

// const clientLogout = (req, res) => {
//     res.clearCookie('jwt');
//     res.redirect('/api/client/login');
// };

// module.exports = {
//     clientLoginPage,
//     clientLogin,
//     clientRegisterPage,
//     clientRegister,
//     getClientHome,
//     getClientProfile,
//     updateClientProfile,
//     getPostTask,
//     postTask,
//     getClientRequests,
//     getClientNotifications,
//     clientLogout
// };

const Client = require('../models/client');
const Task = require('../models/task');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Category = require('../models/category');


const clientLoginPage = (req, res) => {
    res.render('client/clientlogin', { errMsg: null });
};

const clientLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const client = await Client.findOne({ email });
        if (!client) {
            return res.render('client/clientlogin', { errMsg: 'Invalid email or password' });
        }
        const isMatch = await bcrypt.compare(password, client.password);
        if (!isMatch) {
            return res.render('client/clientlogin', { errMsg: 'Invalid email or password' });
        }
        const token = jwt.sign({ id: client._id, role: 'client' }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
        res.cookie('jwt', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
        res.redirect('/api/client/home');
    } catch (err) {
        console.error('Client login error:', err);
        res.render('client/clientlogin', { errMsg: 'Server error' });
    }
};

const clientRegisterPage = (req, res) => {
    res.render('client/client_register', { errMsg: null});
};

const clientRegister = async (req, res) => {
    const { name, email, phone, password, address } = req.body;

    if (!name || !email || !phone || !password || !address) {
        return res.render('client/client_register', { errMsg: 'All fields are required' });
    }

    try {
        // Check if the client already exists
        const existingClient = await Client.findOne({ email });
        if (existingClient) {
            return res.render('client/client_register', { errMsg: 'Client with this email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new client
        const newClient = new Client({
            name,
            email,
            phone,
            password: hashedPassword,
            address
        });

        // Save the client in the database
        await newClient.save();

        // Redirect to login page after successful registration
        res.redirect('/api/client/login');
    } catch (err) {
        console.error('Client register error:', err);
        res.render('client/client_register', { errMsg: 'Registration failed, please try again.' });
    }
};

// const clientRegister = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const newClient = new Client({ email, password: hashedPassword });
//         await newClient.save();
//         res.send('Client Registered');
//     } catch (err) {
//         console.error('Client register error:', err);
//         res.send('Registration failed');
//     }
// };

// const getClientHome = async (req, res) => {
//     try {
//         const clientID = req.clientID;
//         const tasks = await Task.find({ clientID });
//         res.render('client/client_home', { tasks });
//     } catch (err) {
//         console.error('Error fetching client home:', err);
//         res.render('client/client_home', { tasks: [] });
//     }
// };

const getClientHome = async (req, res) => {
    try {
        const clientID = req.clientID;
        const { category, status } = req.query;

        let filter = { clientID };
        if (category && category !== "") filter.category = category;
        if (status && status !== "") filter.status = status;

        const tasks = await Task.find(filter);
        const categories = await Task.distinct("category", { clientID });

        res.render('client/client_home', { tasks, categories, selectedCategory: category, selectedStatus: status });
    } catch (err) {
        console.error('Error fetching client home:', err);
        res.render('client/client_home', { tasks: [], categories: [], selectedCategory: "", selectedStatus: "" });
    }
};


const getClientProfile = async (req, res) => {
    try {
        const clientID = req.clientID;
        const client = await Client.findById(clientID).select('-password');
        if (!client) throw new Error('Client not found');
        
        console.log('Rendering client_profile with client:', client); // Debug
        res.render('client/client_profile', {
            client,
            error: null,
            success: null
        });
    } catch (err) {
        console.error('Error fetching client profile:', err);
        res.render('client/client_profile', {
            client: null,
            error: 'Unable to load profile',
            success: null
        });
    }
};
// const getClientProfile = async (req, res) => {
//     try {
//         const clientID = req.clientID;
//         const client = await Client.findById(clientID).select('-password');
//         if (!client) throw new Error('Client not found');
//         console.log('Rendering client_profile with client:', client); // Debug
//         res.render('client/client_profile', { client });
//     } catch (err) {
//         console.error('Error fetching client profile:', err);
//         res.render('client/client_profile', { client: null, error: 'Unable to load profile' });
//     }
// };

const updateClientProfile = async (req, res) => {
    try {
        const clientID = req.clientID;
        const updates = req.body;

        if (updates.password && updates.password.trim() !== '') {
            updates.password = await bcrypt.hash(updates.password, 10);
        } else {
            delete updates.password; // Don't update password if empty
        }

        const client = await Client.findByIdAndUpdate(clientID, updates, {
            new: true
        }).select('-password');

        res.render('client/client_profile', {
            client,
            success: 'Profile updated successfully',
            error: null
        });
    } catch (err) {
        console.error('Error updating client profile:', err);
        res.render('client/client_profile', {
            client: null,
            error: 'Failed to update profile',
            success: null
        });
    }
};

// const updateClientProfile = async (req, res) => {
//     try {
//         const clientID = req.clientID;
//         const updates = req.body;
//         if (updates.password) {
//             updates.password = await bcrypt.hash(updates.password, 10);
//         }
//         const client = await Client.findByIdAndUpdate(clientID, updates, { new: true }).select('-password');
//         res.render('client/client_profile', { client, success: 'Profile updated successfully' });
//     } catch (err) {
//         console.error('Error updating client profile:', err);
//         res.render('client/client_profile', { client: null, error: 'Failed to update profile' });
//     }
// };

//  const getPostTask = (req, res) => {
//      console.log("Reached getPostTask controller");
//      res.render('client/post_task');
// };

// const getPostTask = async (req, res) => {
//     try {
//         console.log("Reached getPostTask controller");
//         const categories = await Category.find(); // Fetch categories from DB
//         res.render('client/post_task', { categories }); // Pass categories to view
//     } catch (err) {
//         console.error('Error loading categories:', err);
//         res.send('Failed to load task posting page: ' + err.message);
//     }
// };

const getPostTask = async (req, res) => {
    try {
        console.log("Reached getPostTask controller");
        
        const categories = await Category.find(); // Fetch categories from DB
        res.render('client/post_task', { categories }); // Pass to EJS
    } catch (err) {
        console.error("Error in getPostTask:", err);
        res.status(500).send("Server Error");
    }
};


const postTask = async (req, res) => {
    try {
        const { title, description, category } = req.body;
        const clientID = req.clientID;

        const newTask = new Task({
            title,
            description,
            category,
            status: 'open',
            clientID
        });

        console.log('New Task:', newTask);  // Log the new task object before saving

        await newTask.save();
        console.log('Task saved successfully');  // Log after saving task

        // Redirect to client's requests page after posting
        res.redirect('/api/client/myrequests');
    } catch (err) {
        console.error('Error posting task:', err);
        res.send('Failed to post task: ' + err.message);  // Send detailed error message to the client
    }
};

// const postTask = async (req, res) => {
//     try {
//         const { title, description, category } = req.body;
//         const clientID = req.clientID;

//         const newTask = new Task({
//             title,
//             description,
//             category,
//             status: 'open',
//             clientID
//         });

//         await newTask.save();
//         res.redirect('/api/client/myrequests');
//     } catch (err) {
//         console.error('Error posting task:', err);
//         res.send('Failed to post task');
//     }
// };

const getTaskDetails = async (req, res) => {
    try {
        const { taskId } = req.params;
        const task = await Task.findById(taskId).populate('intrestedWorkers');  // Assuming workers are stored in task.intrestedWorkers
        if (!task) {
            return res.status(404).send('Task not found');
        }

        res.render('client/clienttaskdetails', { task });  // Render task details with interested workers
    } catch (err) {
        console.error('Error fetching task details:', err);
        res.status(500).send('Server error');
    }
};




// const getClientRequests = async (req, res) => {
//     try {
//         const clientID = req.clientID;

//         const allTasks = await Task.find({ clientID });

//         // Split into ongoing and previous
//         const ongoingTasks = allTasks.filter(task => task.status === 'ongoing' || task.status === 'open');
//         const previousTasks = allTasks.filter(task => task.status === 'completed');

//         // tasks = all tasks (used in EJS)
//         const tasks = allTasks;

//         res.render('client/client_requests', {
//             tasks,
//             ongoingTasks,
//             previousTasks,
//             error: null // Important fix
//         });
//     } catch (err) {
//         console.error('Error fetching client requests:', err);
//         res.render('client/client_requests', {
//             tasks: [],
//             ongoingTasks: [],
//             previousTasks: [],
//             error: 'Unable to load requests'
//         });
//     }
// };

// const getClientRequests = async (req, res) => {
//     try {
//         const clientID = req.clientID;
//         const selectedStatus = req.query.status || '';  // Get the selected status from the query string

//         // Initialize the filter object for querying tasks
//         let filter = { clientID };

//         // If there's a selected status, add it to the filter
//         if (selectedStatus) {
//             filter.status = selectedStatus;
//         }

//         // Fetch tasks based on the filter
//         const allTasks = await Task.find(filter);

//         // Split tasks into ongoing and completed based on their status
//         const ongoingTasks = allTasks.filter(task => task.status === 'ongoing' || task.status === 'open');
//         const previousTasks = allTasks.filter(task => task.status === 'completed');

//         // Pass the filtered tasks to the view
//         res.render('client/client_requests', {
//             tasks: allTasks,           // All tasks (filtered by status if selected)
//             ongoingTasks,              // Ongoing tasks (open or ongoing)
//             previousTasks,             // Completed tasks
//             selectedStatus,            // The selected status for highlighting in the dropdown
//             error: null                // Error handling is null if everything goes well
//         });
//     } catch (err) {
//         console.error('Error fetching client requests:', err);
//         res.render('client/client_requests', {
//             tasks: [],
//             ongoingTasks: [],
//             previousTasks: [],
//             error: 'Unable to load requests'
//         });
//     }
// };

const getClientRequests = async (req, res) => {
    try {
        const clientID = req.clientID;
        const selectedStatus = req.query.status || '';

        // Always fetch all tasks first
        const allTasks = await Task.find({ clientID });

        // Apply status filter (if any)
        const tasks = selectedStatus
            ? allTasks.filter(task => task.status === selectedStatus)
            : allTasks;

        // These should always be based on ALL tasks
        const ongoingTasks = allTasks.filter(task => task.status === 'ongoing' || task.status === 'open');
        const previousTasks = allTasks.filter(task => task.status === 'completed');

        res.render('client/client_requests', {
            tasks,
            ongoingTasks,
            previousTasks,
            selectedStatus,
            error: null
        });
    } catch (err) {
        console.error('Error fetching client requests:', err);
        res.render('client/client_requests', {
            tasks: [],
            ongoingTasks: [],
            previousTasks: [],
            selectedStatus: '',
            error: 'Unable to load requests'
        });
    }
};


// const getClientRequests = async (req, res) => {
//     try {
//         const clientID = req.clientID;

//         const allTasks = await Task.find({ clientID });

//         // Split into ongoing and previous
//         const ongoingTasks = allTasks.filter(task => task.status === 'ongoing' || task.status === 'open');
//         const previousTasks = allTasks.filter(task => task.status === 'completed');

//         console.log('Rendering client_requests with tasks:', { ongoingTasks, previousTasks });

//         res.render('client/client_requests', { ongoingTasks, previousTasks });
//     } catch (err) {
//         console.error('Error fetching client requests:', err);
//         res.render('client/client_requests', { ongoingTasks: [], previousTasks: [], error: 'Unable to load requests' });
//     }
// };

// const getClientRequests = async (req, res) => {
//     try {
//         const clientID = req.clientID;
//         const tasks = await Task.find({ clientID });
//         console.log('Rendering client_requests with tasks:', tasks); // Debug
//         res.render('client/client_requests', { tasks });
//     } catch (err) {
//         console.error('Error fetching client requests:', err);
//         res.render('client/client_requests', { tasks: [], error: 'Unable to load requests' });
//     }
// };



const clientLogout = (req, res) => {
    res.clearCookie('jwt');
    res.redirect('/api/client/login');
};

const markTaskAsCompleted = async (req, res) => {
    try {
        const { taskId } = req.params;
        const task = await Task.findById(taskId);

        if (!task) {
            return res.status(404).send('Task not found');
        }

        // Optional: Check if this task belongs to the logged-in client
        if (task.clientID.toString() !== req.clientID.toString()) {
            return res.status(403).send('Unauthorized');
        }

        task.status = 'completed';
        await task.save();

        res.redirect('/api/client/myrequests');
    } catch (err) {
        console.error('Error marking task as completed:', err);
        res.status(500).send('Server error');
    }
};

// const getCategoryServices = async (req, res) => {
//     try {
//       const category = await Category.findById(req.params.id);
//       if (!category) return res.status(404).json([]);
  
//       res.json(category.services);
//     } catch (error) {
//       res.status(500).json([]);
//     }
//   };
  
const Worker = require('../models/worker');

const viewInterestedWorkers = async (req, res) => {
    try {
        const task = await Task.findById(req.params.taskId).populate('intrestedWorkers');
        if (!task) return res.status(404).send('Task not found');

        res.render('client/interested_workers', { task });
        
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};


module.exports = {
    clientLoginPage,
    clientLogin,
    clientRegisterPage,
    clientRegister,
    getClientHome,
    getClientProfile,
    updateClientProfile,
    getPostTask,
    postTask,
    getTaskDetails,
    getClientRequests,
    clientLogout,
    markTaskAsCompleted,
    viewInterestedWorkers
    // getCategoryServices
};