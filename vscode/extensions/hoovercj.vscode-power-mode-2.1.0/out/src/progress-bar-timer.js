'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
class ProgressBarTimer {
    constructor() {
        this.secondsRemaining = 0;
        /**
         * Starts a "progress" in the bottom of the vscode window
         * which displays the time remaining for the current combo
         */
        this.startTimer = (timeLimit, onTimerExpired) => {
            if (timeLimit === 0) {
                return;
            }
            this.stopTimer();
            this.active = true;
            this.secondsRemaining = timeLimit;
            vscode.window.withProgress({
                location: vscode.ProgressLocation.Window,
            }, p => {
                return new Promise((resolve, reject) => {
                    // Storing reject will allow us to
                    // cancel the progress
                    this.progressDisposer = reject;
                    p.report({ message: this.getProgressMessage() });
                    this.timerHandle = setInterval(() => {
                        this.secondsRemaining--;
                        p.report({ message: this.getProgressMessage() });
                        if (this.secondsRemaining === 0) {
                            this.stopTimer();
                            onTimerExpired();
                        }
                    }, 1000);
                });
            });
        };
        this.extendTimer = (timeLimit) => {
            this.secondsRemaining = timeLimit;
        };
        /**
         * Disposes the progress and clears the timer that controls it
         */
        this.stopTimer = () => {
            this.active = null;
            clearInterval(this.timerHandle);
            this.timerHandle = null;
            if (this.progressDisposer) {
                this.progressDisposer();
                this.progressDisposer = null;
            }
        };
        /**
         * Builds a message based on how much time is left on the timer
         * @returns The progress message
         */
        this.getProgressMessage = () => {
            return `Combo Timer: ${this.secondsRemaining} seconds`;
        };
    }
}
exports.ProgressBarTimer = ProgressBarTimer;
//# sourceMappingURL=progress-bar-timer.js.map