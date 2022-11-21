const express = require("express"); //Importing Express Module
const path = require("path"); //Require Path Module
    const app = express(); //Calling Express module with express()
    const hbs = require("hbs"); //Importing HandleBars Module
    require("./db/conn"); //Importing conn.js file code to execute it with app.js
    const Register=require("./models/registers"); //Importing registers.js file in app.js
    const port = process.env.PORT || 3000; //process.env.port detects by default system port or it will run on 3000
    const static_path = path.join(__dirname, "../public"); //File Path to integrate public with path
    const template_path = path.join(__dirname, "../templates"); //File Path to integrate templates with path
    const partials_path = path.join(__dirname, "../partials"); //File Path to integrate partials with path
    app.use(express.json());   //Express.json() parses only JSON requests and app.use() bind it with the software
    app.use(express.urlencoded({extended:false})); 

    app.use(express.static(static_path)); //express.static binds all the static data into the app with app.use() function
    app.set("view engine", "hbs");//view engine, the template engine to use. For example, to use the hbs template engine: app.set('view engine', 'hbs').
    app.set("views", template_path); //"views" detects the directory where the template files are located
    hbs.registerPartials(partials_path); 

    console.log(path.join(__dirname, "../public")); 
    // const template_path = path.join(__dirname, "../templates/views");
    //app.get will request the file to import code within specified file path and res.render will render all the code within itself to call it in app.js 
        app.get("/", (req, res) => {   
            res.render("index");
        });
        app.get("/register", (req, res) => {
            res.render("register");
            });
        
            app.get("/login",(req,res)=>{
               res.render("login");
            })
//app.post("/register",async(req,res)) Here /register is specified file path from which it will request HTTP Post Method and async(req,res) is callback function
            app.post("/register", async (req, res) => {
                try {
                const password = req.body.password; //It is for password filling in login
                const cpassword = req.body.confirmpassword;//It will confirm password filling in login
            //If password==cpassword then only we will be able to fill up the data 
                                if(password === cpassword){
                                    const registerEmployee = new Register({
                                        firstName : req.body.firstName,
                                        lastName  : req.body.lastName,
                                        email     : req.body.email,
                                        gender    : req.body.gender,
                                        phone     : req.body.phone,
                                        age       : req.body.age,
                                        password  : password,
                                        confirmpassword: cpassword
                                    })//Here registerEmployee is object in which employeeSchema Data will be filled and will be assigned to each variable accordingly
                                    const registered = await registerEmployee.save(); //It will save the data which will be filled in database
                                    res.status(201).render("index"); //If status==201 it means registration will be successful and index code will be rendered
                                }else{
                                    res.send("passwords are not matching")//If Passwords will not match then it will send request to server to show message "passwords are not matching"
                                }
                            } catch (error) {
                                res.status(400).send(error);
                            }
                        });
            //The app.listen() function is used to bind and listen the connections on the specified host and port.Here it will detect the port and in callback function it will show console.log server is running at port 3000
        app.listen(port, () => {
            console.log(`server is running at port no ${port}`);
        })