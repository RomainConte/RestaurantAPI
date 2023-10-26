const express= require('express')
const mysql= require('mysql2')
const app = express()

const  con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "RO2910ro",
    database: "sql_restapi",
    
})

con.connect((err) => {
    if(err){
        console.error(err)
    }else{
        console.log("CONNECTED !")
    }
})
app.use(express.json())

// START ITEMS

// GET ITEMS AND GET ITEMS BY PARAMETERS 
app.get("/items", (req,res) => {
    var parameters =req.query.parameters
    if(!parameters){
        con.query("select * from items",function(err,result,fields){
            if(err){
                console.log(err)
            }else{
                res.send(result)
            }
        })
    
    }else {
    var select ="select * from items where "+ parameters;
    con.query(select,function(err,result,){
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    })
}
})

// POST ITEMS
app.post("/items",(req,res) =>{
    const items_id=req.body.items_id;
    const items_name = req.body.items_name;
    const items_price = req.body.items_price;
    const items_description = req.body.items_description;
    const categories_id = req.body.categories_id;
    try {
        con.query("insert into items values(?,?,?,?,?)", [items_id,items_name,items_price,items_description,categories_id], function(err,result){
            if(err){
                console.log(err)
                res.status(500).send("one of values is not available")
            }else{
                res.send("Posted")
            }
        })
    
    } catch (error) {
        console.error(error)
        res.status(500).send("one of values is not available")
    }
    
})

// GET ITEMS BY ID
app.get("/items/:id", (req,res) =>{
    const itemsid=req.params.id;
    con.query("select * from items where items_id=?",itemsid,function(err,result,){
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    })

})

// UPDATE ITEMS 
app.put("/items/:id", (req,res) =>{
    const items_id=req.params.id;
    const items_name = req.body.items_name;
    const items_price = req.body.items_price;
    const items_description = req.body.items_description;
    const categories_id = req.body.categories_id;

console.log(items_name)
    con.query("update items set items_name=?, items_price=?, items_description=?, categories_id=? where items_id=?",[items_name,items_price,items_description,categories_id,items_id],function(err,result,){
        if(err){
            console.log(err)
        }else{
            res.send("updated")
            console.log(result)
        }
    })

})

// DELETE ITEMS 
app.delete("/items/:id",(req,res) =>{
    const items_id=req.params.id;
    con.query('delete from items where items_id=?', items_id,(err,result) =>{
        if(err){
            console.log(err)
        }else{
            res.send("deleted")
        }
    })

})

// END ITEMS

//START CATEGORIES 

// GET CATEGORIES   
app.get("/categories", (req,res) => {
        con.query("select * from categories",function(err,result,fields){
            if(err){
                console.log(err)
            }else{
                res.send(result)
            }
        })
})




//POST CATEGORIES
app.post("/categories",(req,res) =>{
    const categories_id=req.body.categories_id;
    const categories_name = req.body.categories_name;
    const categories_description = req.body.categories_description;
    const formula_id = req.body.formula_id;
    try {
        con.query("insert into categories values(?,?,?,?)", [categories_id,categories_name,categories_description,formula_id], function(err,result){
            if(err){
                console.log(err)
                res.status(500).send("one of values is not available")
            }else{
                res.send("Posted")
            }
        })
    
    } catch (error) {
        console.error(error)
        res.status(500).send("one of values is not available")
    }
    
})

// GET CATEGORIES BY ID
app.get("/categories/:id", (req,res) =>{
    const categoriesid=req.params.id;
   
    con.query("select * from categories where categories_id=?",categoriesid,function(err,result,){
        if(err){
            console.log(err)
            res.status(500).send("this id is not available")
        }else{
            res.send(result)
        }
    })

})

//UPDATE CATEGORIES
app.put("/categories/:id", (req,res) =>{
    const categories_id=req.params.id;
    const categories_name = req.body.categories_name;
    const categories_description = req.body.categories_description;
    const formula_id = req.body.formula_id;
   
    con.query("update categories set categories_name=?, categories_description=?,formula_id=? where categories_id=?",[categories_name,categories_description,categories_id,formula_id],function(err,result,){
        if(err){
            console.log(err)
        }else{
            res.send("updated")
            console.log(result)
        }
    })

})

//DELETE CATEGORIES
app.delete("/categories/:id",(req,res) =>{
    const categories_id=req.params.id;
    con.query('delete from categories where categories_id=?', categories_id,(err,result) =>{
        if(err){
            console.log(err)
        }else{
            res.send("deleted")
        }
    })

})  

//END CATEGORIES

//START FORMULAS

// GET FORMULAS
app.get("/formulas", (req,res) => {
    var parameters =req.query.parameters
    if(!parameters){
        con.query("select * from formula",function(err,result,fields){
            if(err){
                console.log(err)
            }else{
                res.send(result)
            }
        })
    
    }else {
    var select ="select * from formula where "+ parameters;
    con.query(select,function(err,result,){
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    })
}
})

//POST FORMULA
app.post("/formulas",(req,res) =>{
    const formula_id=req.body.formula_id;
    const formula_name = req.body.formula_name;
    const formula_price = req.body.formula_price;
    const categories_formula = req.body.categories_formula;
    try {
        con.query("insert into formula values(?,?,?,?)", [formula_id,formula_name,formula_price,categories_formula], function(err,result){
            if(err){
                console.log(err)
                res.status(500).send("one of values is not available")
            }else{
                res.send("Posted")
            }
        })
    
    } catch (error) {
        console.error(error)
        res.status(500).send("one of values is not available")
    }
    
})

// GET formulas BY ID
app.get("/formulas/:id", (req,res) =>{
    const formulaid=req.params.id;
    con.query("select * from formula where formula_id=?",formulaid,function(err,result,){
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    })

})

// UPDATE FORMULA 
app.put("/formulas/:id", (req,res) =>{
    const formula_id=req.params.id;
    const formula_name = req.body.formula_name;
    const formula_price = req.body.formula_price;
    const categories_formula = req.body.categories_formula;

    con.query("update formula set formula_name=?, formula_price=?,categories_formula=? where formula_id=?",[formula_name,formula_price,categories_formula,formula_id],function(err,result,){
        if(err){
            console.log(err)
        }else{
            res.send("updated")
            console.log(result)
        }
    })

})

// DELETE FORMULA 
app.delete("/formulas/:id",(req,res) =>{
    const formula_id=req.params.id;
    con.query('delete from formula where formula_id=?', formula_id,(err,result) =>{
        if(err){
            console.log(err)
        }else{
            res.send("deleted")
        }
    })

})

//END FORMULAS



app.listen(3000,(err) => {
    if(err){
        console.log(err)
    }else{
        console.log("on port 3000")
    }

} )