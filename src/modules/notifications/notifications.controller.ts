import { 
    Body, 
    Controller,  
    Get, 
    Post, 
    Patch,
    Delete,
    Param,
    HttpCode, 
    UsePipes, 
    ValidationPipe, 
    Query} from '@nestjs/common';


@Controller('notifications')
export class NotificationsController {

    //constructor(private )

    @Get('/notifyToWaiter')
    notifyToWaiter() {

    }

}