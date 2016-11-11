class BaseModule {
    constructor(){

    }

    get(req, res, next){
        debug(name)
        res.status(200).send('BASE MODULE test message ')
    }

    post(req, res, next){
        res.status(200).send('BASE MODULE test message')
    }

    put(req, res, next){
        res.status(200).send('BASE MODULE test message')
    }

    delete(req, res, next){
        res.status(200).send('BASE MODULE test message')
    }
}


module.exports = BaseModule