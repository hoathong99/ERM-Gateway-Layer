import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { json } from 'stream/consumers';
import { ProcessService } from 'src/Services/Process/ProcessService';

@Controller('process-controller')
export class ProcessControllerController {
    constructor(private readonly processService: ProcessService) { }

    @Get()
    FindAll(): string {
        return 'This action returns all cats';
    }
    @Post("/GetProcess")
    postHello(@Req() request: any): string {

        console.log(request);
        console.log("-------------------------------NENENENENENENENENENEN-------------------------------------");
        return "";
    }
    @Post("/GetFlowChart")
    async getProcessFlow(@Req() rq: any): Promise<any> {
        // console.log(rq.body);
        switch (rq.body.type) {
            case 'GET_GRAPH': {
                console.log("---------------------------------------------------------GetFlowChart---------------------------------------------------------");
                // let rqId = "fcc4549f-5f81-462e-b57d-52c64b3204e7";          // TEMPO FIXED PATH
                // let chartId = "approval-hr-001-9876543210";                 // TEMPO FIXED PATH
                let rqId = rq.body.data.rqId;         
                let chartId = rq.body.data.grId;                 
                try {
                    const respond = await this.processService.getFlowChart(rqId, chartId);
                    return respond;
                } catch (error) {
                    return { error: 'Failed to fetch flow chart from external API' };
                }
            }
        }
    }
}
