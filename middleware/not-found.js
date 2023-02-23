const notFoundMiddleware = (req, res)=>{
    res.status(404).send('Routes not found')
}

export default notFoundMiddleware