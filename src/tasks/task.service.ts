import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class TaskService {

    private count = 0;

    @Cron(CronExpression.EVERY_5_SECONDS)
    async handleKitchenJob() {

        const url: string = 'http://localhost:3000/kitchen/prepareOrder';
        const body = [];
        this.count++;

        await fetch(url, { method: 'get' });
        console.log('Task excuted every 5 seconds', this.count);
    }
}