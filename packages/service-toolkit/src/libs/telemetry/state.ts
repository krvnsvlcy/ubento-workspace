import { monitorEventLoopDelay } from "node:perf_hooks";

// Event loop lag

const h = monitorEventLoopDelay({ resolution: 10 });
h.enable();
export function getEventLoopLagMs(): number {
    return Math.round(h.mean / 1e6);
}

// Request count

export let requestCount = 0;
export function incrementRequestCount() {
    requestCount++;
}
export function decrementRequestCount() {
    requestCount--;
}

// Service state

export function captureServiceState() {
    const m = process.memoryUsage();
    return {
        uptimeMs: Math.floor(process.uptime() * 1000),
        memRss: m.rss,
        heapUsed: m.heapUsed,
        heapTotal: m.heapTotal,
        eventLoopLagMs: getEventLoopLagMs(),
        requestCount,
    };
}