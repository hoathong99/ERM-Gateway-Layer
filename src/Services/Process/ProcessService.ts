import { HttpService } from '@nestjs/axios';
import { Body, HttpException, Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ProcessService {
    constructor(private readonly httpService: HttpService) { }

    async GetFlowChart(rqId: string, chartId: string): Promise<any> {
        const url = `http://localhost:5678/webhook/${encodeURIComponent(rqId)}`;
        try {
            const response = await this.httpService.post(url, chartId);
            console.log(response);
            return response;
        } catch (error: unknown) {
            // 👇 Check if the error is an AxiosError
            if (error && typeof error === 'object' && 'isAxiosError' in error) {
                const axiosError = error as AxiosError;

                const status = axiosError.response?.status || 500;
                const message = axiosError.response?.data || 'External API Error';

                console.error('Axios Error:', message);

                throw new HttpException(
                    {
                        statusCode: status,
                        message: 'Failed to call external API',
                        error: message,
                    },
                    status
                );
            }
        }
    }

    async getFlowChart(rqId: string, chartId: string): Promise<any> {
        // rqId = "fcc4549f-5f81-462e-b57d-52c64b3204e7";
        // chartId = "approval-hr-001-9876543210";
        const url = `http://localhost:5678/webhook/${encodeURIComponent(rqId)}`;
        const payload = {
            graphId: chartId,
        }
        console.log("RequestID: ", url);
        // console.log(payload);
        try {
            const response = await firstValueFrom(
                this.httpService.post(url, payload)
            );

            console.log("GOTTEN:");
            console.log(response.data);
            return response.data;
        } catch (error: any) {
            console.error('FetchData error:', error?.response?.data || error.message);
            throw new HttpException(
                error?.response?.data || 'External API error',
                error?.response?.status || 500,
            );
        }
    }
}

