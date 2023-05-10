namespace SpriteKind {
    export const NPC = SpriteKind.create()
}
namespace StatusBarKind {
    export const Name = StatusBarKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.NPC, function (sprite, otherSprite) {
    game.splash("Oh, Hello!", "My name is Johan, whats yours?")
    game.splash("Click 'A' to set your name", "")
    PlayerName = 0
    mySprite.setPosition(253, 609)
    ShowPlayername()
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    DirecShoot()
})
function ExitChurch () {
    if (controller.A.isPressed()) {
        mySprite.setPosition(519, 598)
    }
    if (controller.B.isPressed()) {
        mySprite.setPosition(100, 931)
    } else {
    	
    }
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`Sign`, function (sprite, location) {
    game.splash("Would You like to enter the Old Church?", "Click 'A' or 'B'")
    if (mySprite.tileKindAt(TileDirection.Right, assets.tile`Sign`)) {
        TeleportChurch()
    }
    if (mySprite.tileKindAt(TileDirection.Left, assets.tile`Sign`)) {
        TeleportChurch()
    }
    if (mySprite.tileKindAt(TileDirection.Center, assets.tile`Sign`)) {
        TeleportChurch()
    }
    if (mySprite.tileKindAt(TileDirection.Bottom, assets.tile`Sign`)) {
        TeleportChurch()
    }
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    mySprite,
    assets.animation`Walk1left`,
    200,
    false
    )
    controller.moveSprite(mySprite)
    DirecShootVal = 0
})
statusbars.onStatusReached(StatusBarKind.Health, statusbars.StatusComparison.LTE, statusbars.ComparisonType.Percentage, 100, function (status) {
    timer.after(500, function () {
        statusbar.value += 100
    })
})
function TeleportChurch () {
    if (controller.A.isPressed()) {
        mySprite.setPosition(162, 800)
    }
    if (controller.B.isPressed()) {
        mySprite.setPosition(281, 609)
    } else {
    	
    }
}
function DirecShoot () {
    if (DirecShootVal == 0) {
        Bullet = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . 5 . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Projectile)
        Bullet.setPosition(mySprite.x + 7, mySprite.y - 3)
        Bullet.setVelocity(-100, 0)
        music.play(music.melodyPlayable(music.pewPew), music.PlaybackMode.UntilDone)
        music.stopAllSounds()
        pause(200)
    }
    if (DirecShootVal == 1) {
        Bullet = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . 5 . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Projectile)
        Bullet.setPosition(mySprite.x + 7, mySprite.y - 3)
        Bullet.setVelocity(100, 0)
        music.play(music.melodyPlayable(music.pewPew), music.PlaybackMode.UntilDone)
        music.stopAllSounds()
        pause(200)
    }
}
statusbars.onZero(StatusBarKind.Health, function (status) {
    sprites.destroy(mySprite)
    timer.debounce("destroy", 500, function () {
        game.gameOver(false)
        game.setGameOverMessage(false, "GAME OVER")
    })
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile16`, function (sprite, location) {
    game.splash("Would you like to exit the Old Church?", "Click 'A' or 'B'")
    if (mySprite.tileKindAt(TileDirection.Left, assets.tile`myTile16`)) {
        ExitChurch()
    }
    if (mySprite.tileKindAt(TileDirection.Left, assets.tile`myTile17`)) {
        ExitChurch()
    }
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    mySprite,
    assets.animation`Walk1right`,
    200,
    false
    )
    controller.moveSprite(mySprite)
    DirecShootVal = 1
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Player, function (sprite, otherSprite) {
    statusbar.value += -1
})
function ShowPlayername () {
    statusbar2 = statusbars.create(20, 4, StatusBarKind.Name)
    statusbar2.value = PlayerName
    statusbar2.attachToSprite(mySprite)
}
scene.onHitWall(SpriteKind.Projectile, function (sprite, location) {
    sprites.destroy(Bullet)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(Bullet)
    sprites.destroy(Zombie)
    info.changeScoreBy(1)
    pause(2000)
    music.play(music.melodyPlayable(music.spooky), music.PlaybackMode.UntilDone)
})
let statusbar2: StatusBarSprite = null
let Bullet: Sprite = null
let DirecShootVal = 0
let PlayerName = 0
let Zombie: Sprite = null
let statusbar: StatusBarSprite = null
let mySprite: Sprite = null
music.play(music.createSong(assets.song`ThemeSong1`), music.PlaybackMode.InBackground)
game.splash("Walk next to Signs and NPCs", "To talk to or read them")
mySprite = sprites.create(assets.image`Man1`, SpriteKind.Player)
tiles.placeOnTile(mySprite, tiles.getTileLocation(1, 58))
mySprite.setPosition(122, 520)
mySprite.setStayInScreen(true)
mySprite.setFlag(SpriteFlag.ShowPhysics, true)
mySprite.changeScale(0.5, ScaleAnchor.Middle)
statusbar = statusbars.create(20, 4, StatusBarKind.Health)
statusbar.attachToSprite(mySprite)
statusbar.setLabel("HP", 7)
tiles.setCurrentTilemap(tilemap`Overworld-lvl1`)
scroller.scrollBackgroundWithCamera(scroller.CameraScrollMode.BothDirections)
scene.cameraFollowSprite(mySprite)
Zombie = sprites.create(assets.image`Zombie`, SpriteKind.Enemy)
Zombie.setPosition(224, 593)
music.setVolume(100)
game.splash("Click 'A' to jump", "and 'B' to shoot")
Zombie.setScale(1.5, ScaleAnchor.Bottom)
Zombie.follow(mySprite, 10)
let Villager = sprites.create(img`
    .........................
    .........................
    .........................
    ..........eeeee..........
    ..........eeeee..........
    ........eeeeeeeee........
    ..........d6d6d..........
    ..........d8e8d..........
    ..........ddedd..........
    ..........41114..........
    ...........444...........
    ........eeeeeeeee........
    ........eee5bbeee........
    ........eeebbbeee........
    ........eeeedeeee........
    ........eeeedeeee........
    ..........e5bbe..........
    ..........ebbbe..........
    ..........e5bbe..........
    ..........ebbbe..........
    ..........eeeee..........
    ..........ff.ff..........
    .........................
    .........................
    .........................
    `, SpriteKind.NPC)
Villager.setPosition(279, 609)
Villager.changeScale(0.5, ScaleAnchor.Middle)
game.onUpdateInterval(500, function () {
	
})
