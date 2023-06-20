enum RadioMessage {
    message1 = 49434,
    Login = 14889,
    start = 56380
}
namespace SpriteKind {
    export const Logos = SpriteKind.create()
    export const Loader = SpriteKind.create()
}
radio.onReceivedMessage(RadioMessage.start, function () {
    myCounter = sevenseg.createCounter(SegmentStyle.Thick, SegmentScale.Full, 1)
    timer.after(100, function () {
        valtim += 1
    })
})
radio.onReceivedMessage(RadioMessage.Login, function () {
    logger = sprites.create(assets.image`myImage`, SpriteKind.Loader)
    animation.runImageAnimation(
    logger,
    assets.animation`myAnim`,
    100,
    true
    )
    pause(5000)
    sprites.destroy(logger)
    music.play(music.createSong(assets.song`mySong0`), music.PlaybackMode.UntilDone)
    radio.sendMessage(RadioMessage.start)
})
radio.onReceivedMessage(RadioMessage.message1, function () {
    Logo = sprites.create(assets.image`myLogo`, SpriteKind.Logos)
    music.play(music.createSong(assets.song`mySong`), music.PlaybackMode.InBackground)
    for (let index = 0; index < 4; index++) {
        Logo.changeScale(1, ScaleAnchor.Middle)
    }
    pause(5000)
    sprites.destroy(Logo)
    radio.sendMessage(RadioMessage.Login)
})
let Logo: Sprite = null
let logger: Sprite = null
let valtim = 0
let myCounter: DigitCounter = null
radio.sendMessage(RadioMessage.message1)
forever(function () {
    if (valtim == 1) {
        timer.after(500, function () {
            myCounter.count += 1
        })
    }
})
