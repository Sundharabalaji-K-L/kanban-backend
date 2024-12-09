import express, { request, response } from 'express';
import {Task} from '../models/taskModel.js';

const router = express.Router();

router.post('/create', async(request, response)=>{
    
    try{
        if(!request.body.title ||
            !request.body.description || 
            !request.body.owner
        ){
            return response.status(400).send({message: 'all fields are required'})
        }
    
        const newTask = {
            title: request.body.title,
            description: request.body.description,
            owner : request.body.owner,
            status: 'todo'
        };
    
        const task = await Task.create(newTask);
        return response.status(201).send(task);
    }
    catch(error){
        console.log(error.message);
        return response.status(500).send({message: error.message});
    }
})


router.get('/', async(request, response)=>{
    try{
        const tasks = await Task.find({});
        return response.status(200).json(
            {
                count: tasks.length,
                data: tasks
            }
        )
    }

    catch(error){
        console.log(error.message);
        return response.status(500).send({message: error.message});
    }
})

router.put('/:id', async(request, response)=>{
    try{
        if(!request.body.title ||
            !request.body.description || 
            !request.body.owner 
        ){
            return response.status(404).send({message: 'required all fields'});
        }

        const {id} = request.params;
        const result = await Task.findByIdAndUpdate(id, request.body);

        if(!result){
            return response.status(404).json({'message': 'Book not found'})
        }

        return response.status(200).send({message: 'book updated successfully'})
    }
    catch(error){
        response.status(500).send({message: message.error})
    }
})

router.delete('/:id', async (request, response)=>{
    try{
        const {id} = request.params;
        const result = await Task.findandDelete(id);

        if(!result){
            return response.status(404).send({message: 'book not found'})
        }
        return response.status(200).send({message: 'book deleted successfully'})
   
    }
    catch(error){
        return response.status(500).send({message: message.error});
        
    }
})


export default router;