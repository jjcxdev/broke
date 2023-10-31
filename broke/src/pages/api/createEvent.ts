// pages/api/createEvent.ts

import { PrismaClient, Frequency } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).end()
    }

    console.log('Received data:', req.body); 

    const {
        payee,
        amount,
        isRecurring,
        isPreAuthorized,
        startDate,
        endDate,
        recurrenceFrequency,
        daySelected,
        householdId,
    } = req.body

    try {
        const createdEvent = await prisma.event.create({
            data: {
                payee,
                amount: parseFloat(amount),
                isRecurring,
                isPreAuthorized,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                date: new Date(daySelected),
                householdId,
                recurrence: {
                    create: {
                        frequency: recurrenceFrequency as Frequency
                    }
                },
                // Add more fields as necessary, including relations
            }
        })
        res.status(200).json(createdEvent)
    } catch (err) {
        console.error("Server Error: ", err);
        if (err instanceof Error) {
            res.status(400).json({ error: err.message })
        } else {
            res.status(400).json({ error: "An unknown error occured" })
        }
    }
}


