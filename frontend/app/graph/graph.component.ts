import {Component, OnInit, Input, ElementRef} from 'angular2/core';
import {User} from "../user/user";
import {UserService} from "../user/user.service";
import {DayService} from "../log/day.service";

declare var CanvasJS:any;

@Component({
    selector: 'graph',
    template: `
        <div id="graphcontainer"></div>
    `
})
export class GraphComponent implements OnInit {
    @Input() users:Array<User>;

    constructor(
        private element: ElementRef,
        private dayService: DayService
    ) {
    }

    ngOnInit() {
        let days = this.dayService.getDays();

        var chart = new CanvasJS.Chart("graphcontainer", {
            title:{
                text: ""
            },
            zoomEnabled: true,
            axisX: {
                minimum: 0,
                maximum: DayService.NUM_DAYS+3,
            },
            toolTip:{
                content: "{name}: {text}"
            },
            axisY: {
                interval: 10,
                gridColor: '#f0f0f0'
            },
            data: this.getGraphData(days)
        });
        chart.render();
    }

    getGraphData(days:Array<string>) {
        let data:any[] = [];

        this.users.forEach(u => data.push(this.getDataForUser(u, days)));

        data.push(this.createGoalData('#100', '#ffcc00', 100));
        data.push(this.createGoalData('#50', '#C0C0C0', 50));
        data.push(this.createGoalData('#33', '#CD7F32', 33));

        return data;
    }

    getDataForUser(user:User, days:Array<string>) {
        let sum = 0;

        let dataPoints:any = [];

        days.forEach((d, i) => {
            let minutes =  user.days[d];
            if (minutes == undefined || minutes == 0) {
                return;
            }

            sum += minutes;
            let hoursTotal = parseFloat((sum/60).toFixed(2));

            dataPoints.push({
                x: i,
                y: hoursTotal,
                sum: sum,
                text: this.dayService.minutesToHoursAndMinutes(sum)
            });
        });

        let series = {
            type: 'line',
            markerType: 'circle',
            markerSize: 4,
            name: user.name,
            lineThickness: 1,
            dataPoints: dataPoints
        };

        return series;
    }

    createGoalData(name:string, color:string, goal:number) {
        return {
            type: 'line',
            markerType: 'square',
            name: name,
            lineThickness: 3,
            color: color,
            showInLegend: true,
            dataPoints: [
                {x: 0, y: goal/DayService.NUM_DAYS},
                {
                    x: DayService.NUM_DAYS,
                    y: goal,
                    text: this.dayService.minutesToHoursAndMinutes(goal*60)
                }
            ]
        }
    }
}