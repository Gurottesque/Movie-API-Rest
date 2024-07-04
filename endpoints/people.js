import { Router } from 'express';
import api from '../api/api.js';



const router = Router()

router.get('/:id', async (req, res) => { 
    res.send( await api.getData(req.params.id, 'person') );
})

router.get('/', async (req, res) => { 
    const params_api = {
        page : req.query.page,
        language : req.query.language,
        include_adult : req.query.include_adult,
        genres : req.query.genres }

    res.send( await api.search({...params_api}, 'person') )
})



export default router;