const express = require('express')
const router = express.Router()
const Post = require('../models/Post')


// GET
// Home
router.get('/', async (req, res) => {

    try {
        const locals = {
            title: "NodeJS Blog",
            desc: 'Basic nodeJs app using Express and MongodB'
        }

        let perPage = 10
        let page = req.query.page || 1

        const data = await Post.aggregate([{ $sort: { createdAt: -1 } }])
            .skip(perPage * page - perPage)
            .limit(perPage)
            .exec()


        const count = await Post.countDocuments();
        const nextPage = parseInt(page) + 1
        const hasNextPage = nextPage <= Math.ceil(count / perPage)


        res.render('index', {
            locals,
            data,
            current: page,
            nextPage: hasNextPage ? nextPage : null,
            currentRoute: '/'
        })

    } catch (error) {
        console.log(error)
    }
})






router.get('/post/:id', async (req, res) => {
    try {


        let slug = req.params.id
        const data = await Post.findById({ _id: slug })

        const locals = {
            title: data.title,
            desc: 'Basic nodeJs app using Express and MongodB'
        }
        res.render('post', {
            locals,
            data,
            currentRoute: `/post/${slug}`
        })
    }
    catch (error) { console.log(error) }

})
router.post('/search', async (req, res) => {
    try {

        const locals = {
            title: "Search",
            desc: 'Basic nodeJs app using Express and MongodB'
        }

        let searchTerm = req.body.searchTerm
        const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9]/g, "")
        const data = await Post.find({
            $or: [
                { title: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
                { body: { $regex: new RegExp(searchNoSpecialChar, 'i') } }
            ]
        })
        res.render('search', {
            locals, data, currentRoute: '/search'
        })
    }
    catch (error) { console.log(error) }

})






router.get('/about', (req, res) => {
    // Define the locals object for the about page
    const locals = {
        title: "About",
        desc: 'Basic nodeJs app using Express and MongodB'
    }

    res.render('about', {
        locals, // <-- Passing the metadata object
        currentRoute: '/about' // <-- Passing the route variable
    })
})
module.exports = router

























// insert data to database

// function insertData() {
//     Post.insertMany([
//         {
//             title: "Mastering JavaScript Closures",
//             body: "Closures are one of the most powerful yet misunderstood concepts in JavaScript. Let’s explore how they work and when to use them effectively."
//         },
//         {
//             title: "A Beginner’s Guide to RESTful APIs",
//             body: "Learn the fundamentals of REST architecture, HTTP methods, and how to design clean, scalable APIs for your web applications."
//         },
//         {
//             title: "CSS Grid vs Flexbox: When to Use Which",
//             body: "Both Grid and Flexbox revolutionized CSS layout design. This post breaks down their differences with examples for real-world use cases."
//         },
//         {
//             title: "Understanding Node.js Event Loop",
//             body: "Ever wondered how Node.js handles multiple tasks efficiently? The event loop is the magic behind its non-blocking architecture."
//         },
//         {
//             title: "Top 10 VS Code Extensions for Web Developers",
//             body: "Boost your productivity with these must-have VS Code extensions for debugging, formatting, and faster front-end development."
//         },
//         {
//             title: "Deploying Your App on Render: Step-by-Step Guide",
//             body: "Render is a powerful cloud platform for deploying web apps. Follow this simple guide to get your Node.js project live in minutes."
//         },
//         {
//             title: "Demystifying Async/Await in JavaScript",
//             body: "Async/Await simplifies asynchronous code, making it easier to read and debug. Let’s see how to use it the right way with real examples."
//         },
//         {
//             title: "Building a Simple Blog with Express and EJS",
//             body: "Learn how to create a fully functional blog using Express.js and EJS templates — perfect for beginners in backend development."
//         },
//         {
//             title: "How Git and GitHub Make Collaboration Easy",
//             body: "Version control can save your projects from chaos. Discover how Git and GitHub streamline teamwork and project management."
//         },
//         {
//             title: "Optimizing Web Performance in 2025",
//             body: "From image compression to lazy loading, these optimization techniques can make your website faster and more user-friendly."
//         }
//     ]
//     )
// }
// insertData()