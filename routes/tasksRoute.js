import express, { response } from 'express';
import {Task} from '../models/taskModel.js';

const taskRouter = express.Router();


taskRouter.get('/', async(request, response)=>{
    try{
        const tasks = await Task.find({});
        return response.status(200).json(
            {
                count: tasks.length,
                data: tasks
            }
        );
    }

    catch(error){
        response.status(500).send({message: error.message});
    }
})

taskRouter.post('/create', async(request, response)=>{
    try{
        if(!request.body.todo || !request.body.description ||
            !request.body.owner
        ){
            return response.status(404).send({message: 'Required all fields'})
        }

        const newTask = {
            todo: request.body.todo,
            description: request.body.description,
            owner: request.body.owner,
            status: 'todo'
        }

        const task = await Task.create(newTask);
        return response.status(201).send(task);
    }
    catch(error){
        response.status(500).send({message: error.message});
    }
})

taskRouter.put('/update/:id', async(request, response)=>{
    try{
        if(!request.body.todo || !request.body.description||
            !request.body.owner
        ){
            response.status(404).send({message: 'required all field'});
        }

        const {id} = request.params;
        const result = await Task.findByIdAndUpdate(id, request.body);

        if(!result){
            return response.status(404).send({message: "task not Found"})
        }

        return response.status(200).send({message: 'Task has been updated'})
    }

    catch(error){
        return response.status(500).send({message: error.message});
    }
})

taskRouter.delete('/delete/:id', async(request, response)=>{
    try{
        const {id} = request.params;
        const result = await Task.findByIdAndDelete(id);

        if(!result){
            return response.status(404).send({message: 'task not found'})
        }
        return response.status(200).send({message: 'task has been deleted'})
    }
    catch(error){
        return response.status(500).send({message: error.message});
    }
})

export default taskRouter;