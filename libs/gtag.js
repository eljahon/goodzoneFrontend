export const GA_TRACKING_ID_GOODZONE = 'UA-128203164-4'
export const GA_TRACKING_ID_UDEVS = 'UA-128187611-2'

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url) => {
    window.gtag('config', GA_TRACKING_ID_GOODZONE, {
        page_path: url,
    })
}
export const pageview_udevs = (url) => {
    window.gtag('config', GA_TRACKING_ID_UDEVS, {
        page_path: url,
    })
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }) => {
    window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
    })
}