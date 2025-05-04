import express from 'express';
import { prismaClient } from './bin';
import { z } from 'zod';

const app = express();
app.use(express.json());

const inputType = z.object({
    a: z.coerce.number(),
    b: z.coerce.number()
});

//@ts-ignore
app.post("/sum", async (req, res) => {
    const parsedValue = inputType.safeParse(req.body);

    if (!parsedValue.success) {
        return res.status(411).json({
            message: "Invalid input"
        });
    }

    const { a, b } = parsedValue.data;
    const sum = a + b;

    const dbRes = await prismaClient.request.create({
        data: {
            a,
            b,
            answer: sum,
            type: 'ADD'
        }
    });
    console.log("The json value", JSON.stringify({ answer: sum, id: dbRes.id}));
    res.json({
        answer: sum,
        id: dbRes.id
    });
});

export default app; // 👈 make sure this comes after `app` is fully defined
