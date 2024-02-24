import {itemModel} from "../models/itemModel.js";

export const getItems = async (req, res) => {
    try {
        const items = await itemModel.getAllItems();

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(items));
    } catch (err) {
        res.statusCode = 500;
        res.end(`Error: ${err.message}`);
    }
}

export const getItemById = async (req, res, id) => {
    try {
        const item = await itemModel.getItemById(id);

        if (!item) {
            res.statusCode =  404;
            res.end(`Item with ID: ${id} not found.`);
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(item));
        }
    } catch (err) {
        res.statusCode =  500;
        res.end(`Error: ${err.message}`);
    }
}

export const createItem = async (req, res) => {
    try {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', async () => {
            const item = JSON.parse(body);
            const newItemId = await itemModel.createItem(item);
            res.statusCode =  201;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ id: newItemId }));
        });
    } catch (err) {
        res.statusCode =  500;
        res.end(`Error: ${err.message}`);
    }
}

export const updateItem = async (req, res, id) => {
    try {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', async () => {
            const item = JSON.parse(body);

            await itemModel.updateItem(id, item);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ message: `Item with ID: ${id} updated.` }));
        });
    } catch (err) {
        res.statusCode =   500;
        res.end(`Error: ${err.message}`);
    }
}

export const deleteItem = async (req, res, id) => {
    try {
        await itemModel.deleteItem(id);

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ message: `Item with ID: ${id} deleted.` }));
    } catch (err) {
        res.statusCode = 500;
        res.end(`Error: ${err.message}`);
    }
}