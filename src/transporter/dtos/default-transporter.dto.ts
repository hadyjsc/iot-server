import { IsDate, IsNotEmpty, IsObject, IsString } from "class-validator";


/**
 * Data Transform for MQTT
 * 
 * __ = {
 *      action: CREATE | UPDATE | DELETE | SELECT
 *      target: HardwareServices
 *      payload: Object
 *      timestamp: received.data.timestamp | new Date()
 *      options: Object | { qos, topic, retain, dup, cmd }
 * }
 * 
 */

export class DefaultTransporterDto {
    @IsNotEmpty()
    @IsString()
    action: string

    @IsNotEmpty()
    @IsString()
    target: string

    @IsObject()
    @IsNotEmpty()
    payload: object

    @IsNotEmpty()
    @IsString()
    timestamp: string
}