import { describe, expect, it } from "vitest";
import request from 'supertest';
import  app  from '../index'

describe("All test for sum test", () => {
    it("Should return the correct values of sums", async() => {
        const { status, body} = await request(app).post('/sum').send({
            a: 3, 
            b: 6
        });

        expect(body).toEqual({ answer: 9, id: expect.any(Number)});
        expect(status).toBe(200);
    })
})