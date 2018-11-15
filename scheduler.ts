import {clearInterval} from "timers";

class Scheduler {

    private tasks: any[] = []

    private timer: any = null;

    private id = 0;

    public register(callback: any, options: any) {
        const {
            interval = 60,
            immediate = true
        } = options
        this.tasks.push({
            id: this.id,
            callback,
            interval,
            leftTimeToNextCall: immediate ? 0 : interval
        })
        return this.id++
    }

    public unregister(id: number) {
        const index = this.tasks.findIndex((task: any) => task.id === id)
        index !== -1 && this.tasks.splice(index, 1)
    }

    public start() {
        this.timer = setInterval(this.checkTasks.bind(this), 1000)
    }

    public stop() {
        clearInterval(this.timer)
    }

    private checkTasks() {
        for(const task of this.tasks) {
            if (task.leftTimeToNextCall !== 0) {
                task.leftTimeToNextCall--
            }
            else {
                task.callback()
                task.leftTimeToNextCall = task.interval
            }
        }
    }
}

export default new Scheduler()
