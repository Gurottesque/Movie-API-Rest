import { Router } from 'express';
import api from '../api/api.js';



const router = Router()

router.get('/:id', async (req, res) => { 
    res.send( await api.getData(req.params.id, 'movie') );
})

router.get('/', async (req, res) => { 
    const params_api = {
        page : req.query.page,
        region : req.query.region,
        language : req.query.language,
        query : req.query.query,
        genres : req.query.genres }

    res.send( await api.search({...params_api}, 'movie'))
})



export default router;