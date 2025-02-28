import web from "./application/web.js";

web.get('/',(req, res)=> {
    res.send('Hello World')
});

web.listen(3000,()=>{
    console.log(`Test`)
});