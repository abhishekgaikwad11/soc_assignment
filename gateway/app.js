const express= require('express');
const morgan = require('morgan');
const app = express();
app.use(express.json());
app.use(morgan('dev'));
const PORT = 8000;
const axios = require('axios');

app.get('/grocery', (req, res,next) => {
  const token = req.headers.authorization;
  const headers = {
    'Authorization' : token
  } ; 
  axios.get('http://localhost:9000/grocery', {headers: headers})
    .then(response => {
        console.log("grocery get gateway")
      // Handle the response here
            res.send(response.data); // Send the data back to the client
    })
    .catch(error => {
      // Handle errors here
      //console.log(error.status);
      if(error.status==401){
        res.status(401).send({"error":'Token Invalid or expired'}); // Send an error response to the client
      }else {
        res.status(500).send({"error":'An error occurred'}); // Send an error response to the client
      }
      
    });
});

app.get('/grocery/:id', (req, res) => {
    const token = req.headers.authorization;
    const headers = {
        'Authorization' : token
    } ;
    const id = req.params.id;
    axios.get('http://localhost:9000/grocery/'+id,{headers: headers})
      .then(response => {
          
        // Handle the response here
        res.send(response.data); // Send the data back to the client
      })
      .catch(error => {
        // Handle errors here
        console.error(error);
        res.status(500).send('An error occurred'); // Send an error response to the client
      });
  });


app.post('/grocery', (req, res) => {
    const token = req.headers.authorization;
    const headers = {
        'Authorization' : token
    } ;
    const postData = {
        name: req.body.name,
        description: req.body.description,
        weight: req.body.weight,
        price: req.body.price
    };
    axios.post('http://localhost:9000/grocery/',postData,{headers: headers})
    .then(response => {
        // Handle the response here
        res.send(response.data); // Send the data back to the client
    })
    .catch(error => {
        // Handle errors here
        console.error(error.status);
        res.status(500).send('An error occurred'); // Send an error response to the client
    });
});  

app.put('/grocery/:id', (req, res) => {
    const token = req.headers.authorization;
    const headers = {
        'Authorization' : token
    } ;
	const id = req.params.id;
    const postData = {
        _id:req.params.id,
        price: req.body.price
    };
    axios.put('http://localhost:9000/grocery/'+id,postData,{headers: headers})
    .then(response => {
        // Handle the response here
        res.send(response.data); // Send the data back to the client
    })
    .catch(error => {
        // Handle errors here
        console.error(error);
        res.status(500).send('An error occurred'); // Send an error response to the client
    });
});


app.patch('/grocery/:id', (req, res) => {
    const token = req.headers.authorization;
    const headers = {
        'Authorization' : token
    } ;
	const id = req.params.id;
    const postData = {
        _id:req.params.id,
        price: req.body.price
    };
    axios.patch('http://localhost:9000/grocery/'+id,postData,{headers: headers})
    .then(response => {
        // Handle the response here
        res.send(response.data); // Send the data back to the client
    })
    .catch(error => {
        // Handle errors here
        console.error(error);
        res.status(500).send('An error occurred'); // Send an error response to the client
    });
});

app.delete('/grocery/:id', (req, res, next) => {
    const id = req.params.id;
    const token = req.headers.authorization;
    const headers = {
        'Authorization' : token
    } ;
	
    axios.delete('http://localhost:9000/grocery/'+id,{headers: headers})
    .then(response => {
        // Handle the response here
        res.send(response.data); // Send the data back to the client
    })
    .catch(error => {
        // Handle errors here
        console.error(error);
        res.status(500).send('An error occurred'); // Send an error response to the client
    });
});


app.post('/signup', (req, res) => {
  const postData = {
    email: req.body.email,
    password: req.body.password
  };
  axios.post('http://localhost:3001/user/signup', postData)
    .then(response => {
      // Handle the response here
            res.send(response.data); // Send the data back to the client
    })
    .catch(error => {
      // Handle errors here
      console.error(error);
      res.status(500).send('An error occurred'); // Send an error response to the client
    });
});

app.post('/login', (req, res) => {
  const postData = {
    email: req.body.email,
    password: req.body.password
  };
  axios.post('http://localhost:3001/user/login',postData)
    .then(response => {
      // Handle the response here
            res.send(response.data); // Send the data back to the client
    })
    .catch(error => {
      // Handle errors here
      console.error(error);
      res.status(500).send('An error occurred'); // Send an error response to the client
    });
});
 app.get('/info',(req,res,next)=>
{
    res.status(200).send("API Gateway running on port 8000");
})
app.listen(PORT,()=>
{
    console.log("API Gateway started on port -> "+ PORT);
});