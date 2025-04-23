const Admin = require('../models/admin');
const Worker = require('../models/worker');
const Client = require('../models/client');
const Task = require('../models/task');
const Category = require('../models/category');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const adminLoginPage = (req, res) => {
    res.render('admin/admin_login', { errMsg: null });
};

const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('Raw input:', { email, password: JSON.stringify(password) }); // Log exact input

        const admin = await Admin.findOne({ email });
        console.log('Found admin:', admin);

        if (!admin) {
            console.log('No admin found for email:', email);
            return res.render('admin/admin_login', { errMsg: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        console.log('Password match:', isMatch);

        if (!isMatch) {
            console.log('Password mismatch for:', email);
            return res.render('admin/admin_login', { errMsg: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: admin._id, role: 'admin' }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
        console.log('Token generated:', token);

        // res.cookie('jwt', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: false, // important for localhost!
            sameSite: 'lax', // ensures cookie is sent on POST
            maxAge: 24 * 60 * 60 * 1000,
          });
          
        res.redirect('/api/admin/dashboard');
    } catch (err) {
        console.error('Login error:', err);
        res.render('admin/admin_login', { errMsg: 'Server error' });
    }
};

const getAdminDashboard = async (req, res) => {
    try {
        const workersCount = await Worker.countDocuments();
        const clientsCount = await Client.countDocuments();
        const tasksCount = await Task.countDocuments();
        console.log('Dashboard data:', { workersCount, clientsCount, tasksCount });
        res.render('admin/admindashboard', { workersCount, clientsCount, tasksCount });
    } catch (err) {
        console.error('Dashboard error:', err);
        res.status(500).send('Server error');
    }
};

// const getAdminWorkers = async (req, res) => {
//     try {
//         const workers = await Worker.find();
//         res.render('admin/adminworkers', { workers });
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Server error');
//     }
// };

const getAdminWorkers = async (req, res) => {
    try {
        const { search } = req.query; // Get the search query from the request

        // If there's a search term, filter workers by name or phone number
        let workers;
        if (search) {
            workers = await Worker.find({
                $or: [
                    { name: { $regex: search, $options: 'i' } }, // Case-insensitive search for name
                    { phone: { $regex: search, $options: 'i' } },  // Case-insensitive search for phone number
                    { jobCategory: { $regex: search, $options: 'i' } }
                ]
            });
        } else {
            workers = await Worker.find(); // If no search query, fetch all workers
        }

        // Render the workers page with the filtered or all workers
        res.render('admin/adminworkers', { workers });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

// const getAdminClients = async (req, res) => {
//     try {
//         const clients = await Client.find();
//         res.render('admin/adminclients', { clients });
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Server error');
//     }
// };

const getAdminClients = async (req, res) => {
    try {
        const { search } = req.query; // Get the search query from the request

        // If there's a search term, filter clients by name or phone number
        let clients;
        if (search) {
            clients = await Client.find({
                $or: [
                    { name: { $regex: search, $options: 'i' } }, // Case-insensitive search for name
                    { phone: { $regex: search, $options: 'i' } }, // Case-insensitive search for phone number
                ]
            });
        } else {
            clients = await Client.find(); // If no search query, fetch all clients
        }

        // Render the clients page with the filtered or all clients
        res.render('admin/adminclients', { clients });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};


const adminLogout = (req, res) => {
    res.clearCookie('jwt');
    res.redirect('/api/admin/login');
};

// New function to get worker details
const getWorkerDetails = async (req, res) => {
    try {
      // Fetch worker details by ID
      const worker = await Worker.findById(req.params.id);
  
      if (!worker) {
        return res.status(404).send('Worker not found');
      }
  
      // Render worker details page
      res.render('admin/workerDetails', { worker });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  };

//   const updateWorkerVerification = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const isVerify = req.body.isVerify === 'true';

//         await Worker.findByIdAndUpdate(id, { isVerify });
//         res.redirect('/api/admin/workers');
//     } catch (err) {
//         console.error('Verification update error:', err);
//         res.status(500).send('Server error');
//     }
// };

// const updateWorkerVerification = async (req, res) => {
//     try {
//       const { id } = req.params;
//       const isVerify = (req.body.isVerify === true || req.body.isVerify === 'true');
  
//       await Worker.findByIdAndUpdate(id, { isVerify });
  
//       // Handle redirect only if NOT using fetch
//       if (req.headers['content-type'] === 'application/json') {
//         return res.status(200).json({ message: 'Verification updated' });
//       }
  
//       res.redirect('/api/admin/workers');
//     } catch (err) {
//       console.error('Verification update error:', err);
//       res.status(500).send('Server error');
//     }
//   };

const updateWorkerVerification = async (req, res) => {
    try {
      const { id } = req.params;
      const { isVerify } = req.body;

      // Log for debugging
      console.log('Updating verification for worker:', id, 'to', isVerify);
  
      await Worker.findByIdAndUpdate(id, { isVerify: isVerify === 'true' });
  
      res.status(200).send('Verification updated');
    } catch (err) {
      console.error('Verification update error:', err);
      res.status(500).send('Server error');
    }
  };

  
// const getAllTasks = async (req, res) => {
//     try {
//         const tasks = await Task.find().populate({path: 'clientID' , strictPopulate: false }); // clientID is correct here
//         res.render('admin/pairing', { tasks });
//     } catch (err) {
//         console.error('Error fetching tasks:', err.message);
//         res.status(500).send('Server Error: ' + err.message);
//     }
// };

// const getAllTasks = async (req, res) => {
//     try {
//         const { search } = req.query;
//         console.log('Search Query:', search);

//         let filter = {};
//         if (search) {
//             filter.category = { $regex: search, $options: 'i' };
//         }

//         const tasks = await Task.find(filter).populate({ path: 'clientID', strictPopulate: false });
//         console.log("Filtered tasks count:", tasks.length);
//         res.render('admin/pairing', { tasks });
//     } catch (err) {
//         console.error('Error fetching tasks:', err.message);
//         res.status(500).send('Server Error: ' + err.message);
//     }
// };

const getAllTasks = async (req, res) => {
    try {
        const { search } = req.query;

        const filter = {};
        if (search && search.trim() !== "") {
            filter.category = { $regex: search, $options: 'i' };
        }

        const tasks = await Task.find(filter).populate({ path: 'clientID', strictPopulate: false });
        const categories = await Task.distinct("category"); // ✅ ensure this is returned

        res.render('admin/pairing', {
            tasks,
            categories,
            selectedCategory: search || ""
        });
    } catch (err) {
        console.error('Error fetching tasks:', err.message);
        res.status(500).send('Server Error: ' + err.message);
    }
};



const deleteWorker = async (req, res) => {
    try {
        await Worker.findByIdAndDelete(req.params.workerID);
        res.redirect('/api/admin/workers');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting worker');
    }
};

// const deleteTask = async (req, res) => {
//     try {
//         const taskId = req.params.id;
//         await Task.findByIdAndDelete(taskId);
//         res.redirect('/api/admin/pairing');
//     } catch (err) {
//         console.error('Error deleting task:', err.message);
//         res.status(500).send('Server Error: ' + err.message);
//     }
// };

const deleteClient = async (req, res) => {
    try {
        const clientId = req.params.id;
        await Client.findByIdAndDelete(clientId);
        await Task.deleteMany({ clientID: clientId }); // Optional: clean up their tasks
        res.redirect('/api/admin/clients');
    } catch (err) {
        console.error('Error deleting client:', err.message);
        res.status(500).send('Server Error: ' + err.message);
    }
};

const getClientTasks = async (req, res) => {
    try {
        const client = await Client.findById(req.params.id);
        const tasks = await Task.find({ clientID: client._id });

        res.render('admin/clientTasks', { client, tasks });
    } catch (err) {
        console.error('Error fetching client tasks:', err.message);
        res.status(500).send('Server Error');
    }
};

// const deleteTask = async (req, res) => {
//     try {
//       const taskId = req.params.id;
//       const task = await Task.findByIdAndDelete(taskId);
      
//       if (!task) {
//         return res.status(404).send('Task not found');
//       }
  
//       // Redirect back to the client tasks page
//       res.redirect(`/api/admin/client/${task.clientID}/tasks`);
//     } catch (err) {
//       console.error('Error deleting task:', err.message);
//       res.status(500).send('Server Error: ' + err.message);
//     }
//   };

const deleteTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        const task = await Task.findByIdAndDelete(taskId); // Find and delete the task

        if (!task) {
            return res.status(404).send('Task not found');
        }

        // Redirect the admin to the client's tasks page
        res.redirect(`/api/admin/client/${task.clientID}/tasks`);
    } catch (err) {
        console.error('Error deleting task:', err.message);
        res.status(500).send('Server Error: ' + err.message);
    }
};

// Add a new service under a category
// const addServiceToCategory = async (req, res) => {
//     const { categoryId } = req.params;
//     const { name, price } = req.body;
  
//     try {
//       const category = await Category.findById(categoryId);
//       if (!category) return res.status(404).send('Category not found');
  
//       category.services.push({ name, price });
//       await category.save();
//       res.redirect('/api/admin/categories'); // Adjust as needed
//     } catch (error) {
//       console.error(error);
//       res.status(500).send('Server error');
//     }
//   };


  
  // GET: Render category + service form
//   const getAdminCategories = (req, res) => {
//     res.render('admin/admincategories');
//   };
  
  // POST: Save category + services
//   const addCategory = async (req, res) => {
//     try {
//       const { name, services } = req.body;
  
//       const formattedServices = Array.isArray(services)
//         ? services.map(s => ({ name: s.name, price: s.price }))
//         : Object.values(services);  // if from indexed input
  
//       const newCategory = new Category({
//         name,
//         services: formattedServices
//       });
  
//       await newCategory.save();
//       res.redirect('/api/admin/dashboard');
//     } catch (error) {
//       console.error('Error adding category:', error);
//       res.send('Failed to add category: ' + error.message);
//     }
//   };
  
  
module.exports = {
    adminLoginPage,
    adminLogin,
    getAdminDashboard,
    getAdminWorkers,
    getAdminClients,
    adminLogout,
    getWorkerDetails,
    updateWorkerVerification,
    getAllTasks,
    deleteWorker,
    deleteClient,
    getClientTasks,
    deleteTask,
    // addServiceToCategory,
    // getAdminCategories,
    // addCategory
};