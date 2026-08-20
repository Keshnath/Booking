import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
    getHeath(){
        return {
            message : "OK",
            
        }
    }
}
