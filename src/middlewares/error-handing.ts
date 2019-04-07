export default async (ctx: any, next:any) => {
    try {
        await next()
        if (ctx.status === 404) {
            ctx.throw(404)
        }
    } catch (e) {
        let { status, message, stack } = e
        if (!status) {
            status = 500
        }
        console.log(status, message, stack)
        await ctx.render('error', { status, message, stack })
    }
}
