const Worker = require('../models/worker');
const Task = require('../models/task');
const Category = require('../models/category');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const workerLoginPage = (req, res) => {
    res.render('worker/workerlogin', { errMsg: null });
};

// const workerLogin = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const worker = await Worker.findOne({ email });
//         if (!worker) return res.render('worker/workerlogin', { errMsg: 'Invalid email or password' });
//         const isMatch = await bcrypt.compare(password, worker.password);
//         if (!isMatch) return res.render('worker/workerlogin', { errMsg: 'Invalid email or password' });
//         const token = jwt.sign({ id: worker._id, role: 'worker' }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
//         res.cookie('jwt', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
//         res.redirect('/api/worker/home');
//     } catch (err) {
//         console.error(err);
//         res.render('worker/workerlogin', { errMsg: 'Server error' });
//     }
// };

// const workerLogin = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const worker = await Worker.findOne({ email });
//         if (!worker) return res.render('worker/workerlogin', { errMsg: 'Invalid email or password' });

//         const isMatch = await bcrypt.compare(password, worker.password);
//         if (!isMatch) return res.render('worker/workerlogin', { errMsg: 'Invalid email or password' });

//         // Set session here
//         req.session.workerID = worker._id;
//         console.log('Session workerID set:', req.session.workerID); // Debug log
//         res.redirect('/api/worker/home');
//     } catch (err) {
//         console.error(err);
//         res.render('worker/workerlogin', { errMsg: 'Server error' });
//     }
// };

// workerLogin controller


const workerLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const worker = await Worker.findOne({ email });
        if (!worker) return res.render('worker/workerlogin', { errMsg: 'Invalid email or password' });

        const isMatch = await bcrypt.compare(password, worker.password);
        if (!isMatch) return res.render('worker/workerlogin', { errMsg: 'Invalid email or password' });

        const token = jwt.sign({ id: worker._id, role: 'worker' }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });

        res.cookie('jwt', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }); // 1 day
        res.redirect('/api/worker/home');
    } catch (err) {
        console.error(err);
        res.render('worker/workerlogin', { errMsg: 'Server error' });
    }
};


const workerRegisterPage = (req, res) => {
    res.render('worker/workerregister', { errMsg: null });
};

const workerRegister = async (req, res) => {
    try {
        const { name, email, phone, password, address, highestQualification, jobCategory } = req.body;
        const existingWorker = await Worker.findOne({ email });
        if (existingWorker) return res.render('worker/workerregister', { errMsg: 'Email already registered' });
        const hashedPassword = await bcrypt.hash(password, 10);
        const worker = new Worker({
            name,
            email,
            phone,
            password: hashedPassword,
            address,
            highestQualification,
            jobCategory,
            isVerify: false,
        });
        await worker.save();
        res.redirect('/api/worker/login');
    } catch (err) {
        console.error(err);
        res.render('worker/workerregister', { errMsg: 'Server error' });
    }
};

// const getWorkerHome = async (req, res) => {
//     // Check if workerID is set from JWT
//     if (!req.workerID) {
//         return res.status(404).send('Worker not found');
//     }

//     const worker = await Worker.findById(req.workerID);
//     if (!worker) {
//         return res.status(404).send('Worker not found');
//     }

//     // Only fetch tasks that are NOT completed
//     const tasks = await Task.find({ status: { $ne: 'completed' } });

//     res.render('worker/workerhome', { worker, tasks });
// };



// const getWorkerHome = async (req, res) => {
//     try {
//        // const worker = req.session.worker;

//         let filter = {status: { $ne: 'completed' }};
//         if (req.query.category) {
//             filter.category = { $regex: new RegExp(req.query.category, 'i') };
//         }

//         const tasks = await Task.find(filter).populate('clientID');

//         res.render('worker/workerhome', {
//             tasks, worker: req.worker , category:req.query.category
//         });
//     } catch (err) {
//         console.error("Error fetching tasks:", err);
//         res.status(500).send("Server Error");
//     }
// };

const getWorkerHome = async (req, res) => {
    try {
        const workerId = req.workerID;
        
        // Base filter (excluding completed tasks)
        let filter = { status: { $ne: 'completed' } };

        // Add category filter if provided
        if (req.query.category) {
            filter.category = { $regex: new RegExp(req.query.category, 'i') };
        }

        // Add application filter if specified
        if (req.query.filter) {
            if (req.query.filter === 'applied') {
                filter.intrestedWorkers = { $in: [workerId] }; // Tasks the worker has applied for
            } else if (req.query.filter === 'unapplied') {
                filter.intrestedWorkers = { $nin: [workerId] }; // Tasks the worker hasn't applied for
            }
        }

        // Fetch the tasks from the database
        const tasks = await Task.find(filter).populate('clientID');

        res.render('worker/workerhome', {
            tasks,
            worker: req.worker,
            category: req.query.category,
            selectedFilter: req.query.filter || '',  // Add selected filter to highlight active filter
        });
    } catch (err) {
        console.error('Error fetching tasks:', err);
        res.status(500).send('Server Error');
    }
};


// const getWorkerProfile = async (req, res) => {
//     try {
//         const worker = await Worker.findById(req.workerID);
//         res.render('worker/workerprofile', { user: worker });
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Server error');
//     }
// };

// const getWorkerProfile = async (req, res) => {
//     try {
//         const worker = await Worker.findById(req.workerID);

//         res.render('worker/workerprofile', {
//             worker,         // matches <%= worker.email %>
//             error: null,    // avoids ReferenceError
//             success: null   // avoids ReferenceError
//         });

//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Server error');
//     }
// };

const getWorkerProfile = async (req, res) => {
    try {
        // Fetch worker details by workerID (Assuming workerID is in req.workerID)
        const worker = await Worker.findById(req.workerID);

        // Pass all worker details to the profile view
        res.render('worker/workerprofile', {
            worker: worker,
            success: req.flash('success'),
            error: req.flash('error')
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

// const updateWorkerProfile = async (req, res) => {
//     try {
//         const { name, phone, address, highestQualification, bio } = req.body;
//         await Worker.findByIdAndUpdate(req.workerID, {
//             name,
//             phone,
//             address,
//             highestQualification,
//             bio,
//         });
//         res.redirect('/api/worker/profile');
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Server error');
//     }
// };

// const updateWorkerProfile = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const worker = await Worker.findById(req.workerID);

//         if (!worker) {
//             return res.render('worker/workerprofile', {
//                 error: 'Worker not found.',
//                 success: null,
//                 worker: null
//             });
//         }

//         worker.email = email || worker.email;
//         if (password) {
//             worker.password = password; // assuming pre-save hash middleware
//         }

//         await worker.save();

//         res.render('worker/workerprofile', {
//             worker,
//             success: 'Profile updated successfully.',
//             error: null
//         });
//     } catch (err) {
//         console.error(err);
//         res.render('worker/workerprofile', {
//             error: 'An error occurred while updating.',
//             success: null,
//             worker: null
//         });
//     }
// };

const updateWorkerProfile = async (req, res) => {
    try {
        // Destructure all fields from the request body
        const { name, phone, address, highestQualification, bio } = req.body;

        // Update worker profile with new data
        await Worker.findByIdAndUpdate(req.workerID, {
            name,
            phone,
            address,
            highestQualification,
            bio,
        });

        // Set success flash message
        req.flash('success', 'Profile updated successfully.');

        // Redirect to the profile page
        res.redirect('/api/worker/profile');
    } catch (err) {
        console.error(err);

        // Set error flash message
        req.flash('error', 'An error occurred while updating.');

        // Redirect back to profile page
        res.redirect('/api/worker/profile');
    }
};


const getWorkerCategories = async (req, res) => {
    try {
        const worker = await Worker.findById(req.workerID);
        const categories = await Category.find({ _id: { $nin: worker.categories.map(c => c.categoryID) } });
        res.render('worker/worker_categories', { categories, errMsg: null });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

const addWorkerCategory = async (req, res) => {
    try {
        const { categoryID, experience } = req.body;
        const worker = await Worker.findById(req.workerID);
        worker.categories.push({ categoryID, experience });
        await worker.save();
        res.redirect('/api/worker/categories');
    } catch (err) {
        console.error(err);
        res.render('worker/worker_categories', { categories: [], errMsg: 'Server error' });
    }
};



// const getWorkerTaskNego = async (req, res) => {
//     try {
//         const task = await Task.findById(req.params.taskID).populate('clientID', 'name');
//         res.render('worker/workertasknego', { task });
        
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Server error');
//     }
// };

// const getWorkerTaskNego = async (req, res) => {
//     try {
//         const task = await Task.findById(req.params.taskID).populate('clientID', 'name');
//         res.render('worker/workertaskview', { task }); // changed view name for clarity
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Server error');
//     }
// };

// const getWorkerTaskView = async (req, res) => {
//     try {
//         const task = await Task.findById(req.params.taskID).populate('clientID', 'name phone');
//         res.render('worker/workertaskview', { task });
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Server error');
//     }
// };

// const getWorkerTaskView = async (req, res) => {
//     try {
//         const task = await Task.findById(req.params.taskID).populate('clientID');

//         // Block access to completed tasks
//         if (!task || task.status === 'completed') {
//             return res.status(403).send('This task is no longer available.');
//         }

//         res.render('worker/workertaskview', { task });
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Server error');
//     }
// };

// const getWorkerTaskView = async (req, res) => {
//     try {
//         const task = await Task.findById(req.params.taskID).populate('clientID');

//         if (!task || task.status === 'completed') {
//             return res.status(403).send('This task is no longer available.');
//         }

//         const workerID = req.session.workerID;
//         const alreadyApplied = task.intrestedWorkers.includes(workerID);
//         console.log('Already Applied:', alreadyApplied);

//         res.render('worker/workertaskview', { task, alreadyApplied });
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Server error');
//     }
// };

const getWorkerTaskView = async (req, res) => {
    try {
        const task = await Task.findById(req.params.taskID).populate('clientID');
        const workerId = req.workerID;

        // Block access to completed tasks
        if (!task || task.status === 'completed') {
            return res.status(403).send('This task is no longer available.');
        }

        // Check if the worker has already applied for the task
        const alreadyApplied = task.intrestedWorkers.includes(workerId);

        // Pass the task and the alreadyApplied flag to the view
        res.render('worker/workertaskview', { task, alreadyApplied });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};


const workerLogout = (req, res) => {
    res.clearCookie('jwt');
    res.redirect('/api/worker/login');
};

// middleware/sessionAuth.js
const sessionAuth = (req, res, next) => {
    if (!req.session.workerID) {
        return res.redirect('/api/worker/login');
    }
    next();
};

// const applyForTask = async (req, res) => {
//     try {
//         const taskId = req.params.taskID;
//         const workerId = req.workerID;

//         const task = await Task.findById(taskId);
//         if (!task) return res.status(404).send('Task not found');

//         if (!task.intrestedWorkers.includes(workerId)) {
//             task.intrestedWorkers.push(workerId);
//             await task.save();
//         }

//         // res.redirect('/api/worker/home');
//         res.redirect(`/api/worker/task/${taskId}/view`);
//     } catch (err) {
//         console.error('Error applying for task:', err);
//         res.status(500).send('Server error');
//     }
// };

const applyForTask = async (req, res) => {
    try {
        const taskId = req.params.taskID;
        const workerId = req.workerID;

        const task = await Task.findById(taskId);
        if (!task) return res.status(404).send('Task not found');

        // Check if the worker has already applied
        if (task.intrestedWorkers.includes(workerId)) {
            // Redirect back with the 'alreadyApplied' flag in the query string
            return res.redirect(`/api/worker/task/${taskId}/view?alreadyApplied=true`);
        }

        // Add the worker to the list of interested workers
        task.intrestedWorkers.push(workerId);
        await task.save();

        // Redirect back to the task view page
        res.redirect(`/api/worker/task/${taskId}/view`);
    } catch (err) {
        console.error('Error applying for task:', err);
        res.status(500).send('Server error');
    }
};

module.exports = {
    workerLoginPage,
    workerLogin,
    workerRegisterPage,
    workerRegister,
    getWorkerHome,
    getWorkerProfile,
    updateWorkerProfile,
    getWorkerCategories,
    addWorkerCategory,
    getWorkerTaskView,
    workerLogout,
    sessionAuth,
    applyForTask
};