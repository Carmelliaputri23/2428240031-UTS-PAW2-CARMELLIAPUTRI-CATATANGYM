const requestLogger = (req, res, next) => {
    const timeStart = new Date()

    res.on('finish', () => {
        const timeEnd = new Date()

        const duration =
            timeEnd.getTime() - timeStart.getTime()

        console.log({
            timeStart,
            timeEnd,
            duration
        })
    })

    next()
}

export default requestLogger
