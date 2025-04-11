import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { json } from 'stream/consumers';
import { ProcessService } from 'src/Services/Process/ProcessService';
import { FormService } from 'src/Services/Process/FormService';

@Controller('process-controller')
export class ProcessControllerController {
    constructor(private readonly processService: ProcessService, private readonly formService: FormService) { }

    @Get()
    FindAll(): string {
        return 'This action returns all cats';
    }
    @Post("/Gateway")
    async Portal(@Req() rq: any): Promise<any> {
        console.log(rq.body);
        switch (rq.body.type) {
            case 'GET_GRAPH': {
                console.log("---------------------------------------------------------GET_GRAPH---------------------------------------------------------");
                let rqId = rq.body.data.rqId;         
                let chartId = rq.body.data.grId;                 
                try {
                    const respond = await this.processService.getFlowChart(rqId, chartId);
                    return respond;
                } catch (error) {
                    return { error: 'Failed to fetch flow chart from external API' };
                }
            }
            case 'GET_NODE': {
                console.log("---------------------------------------------------------GET_GRAPH---------------------------------------------------------");
                let rqId = rq.body.data.rqId;         
                let nodeLoader = rq.body.data.loaderId;                 
                try {
                    const respond = await this.processService.getNodeSchema(rqId, nodeLoader);
                    return respond;
                } catch (error) {
                    return { error: 'Failed to fetch flow chart from external API' };
                }
            }
            case 'SUBMIT_FORM':{
                console.log("---------------------------------------------------------SUBMIT_FORM---------------------------------------------------------");
                try {
                    let data = rq.body.data.data;         
                    let parent = rq.body.data.parentId; 
                    const respond = await this.formService.SubmitFormData(data, parent);
                    return respond;
                } catch (error) {
                    return { error: 'Failed to fetch flow chart from external API' };
                }
           }
           case 'GET_SUBMISSION':{
            console.log("---------------------------------------------------------GET_SUBMISSION---------------------------------------------------------");
            try {
                let data = rq.body.data.parentId;         
                const respond = await this.formService.GetAllSubmission(data);
                return respond;
            } catch (error) {
                return { error: 'Failed to fetch flow chart from external API' };
            }
       }
            default:{
                return { error: 'UNAVAILABLE TYPE' };
            }
        }
    }
    @Post("/GetFlowChart")
    async getProcessFlow(@Req() rq: any): Promise<any> {
        // console.log(rq.body);
        switch (rq.body.type) {
            case 'GET_GRAPH': {
                console.log("---------------------------------------------------------GetFlowChart---------------------------------------------------------");
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
