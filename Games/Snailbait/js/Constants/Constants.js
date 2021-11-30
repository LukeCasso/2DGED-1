
class GameData {
  static AUDIO_CUE_ARRAY = [
    new AudioCue("background", AudioType.Background, 1, 1, 0, true),
    new AudioCue("jump", AudioType.Move, 1, 1, 0, false),
    new AudioCue("game-over", AudioType.WinLose, 1, 1, 0, false)
  ];

  static BACKGROUND_DIMENSIONS = new Vector2(384, 216);

  static BACKGROUND_DATA = [
    {
      id: "Background 1",
      spriteSheet: document.getElementById("snailbait_background_1"),
      sourcePosition: Vector2.Zero,
      sourceDimensions: this.BACKGROUND_DIMENSIONS,
      translation: Vector2.Zero,
      rotation: 0,
      scale: Vector2.One,
      origin: Vector2.Zero,
      actorType: ActorType.Background,
      collisionType: CollisionType.NotCollidable,
      layerDepth: 0,
      scrollSpeedMultiplier: 0.2
    },
    {
      id: "Background 2",
      spriteSheet: document.getElementById("snailbait_background_2"),
      sourcePosition: Vector2.Zero,
      sourceDimensions: this.BACKGROUND_DIMENSIONS,
      translation: Vector2.Zero,
      rotation: 0,
      scale: Vector2.One,
      origin: Vector2.Zero,
      actorType: ActorType.Background,
      layerDepth: 0.1,
      scrollSpeedMultiplier: 0.15
    },
    {
      id: "Background 3",
      spriteSheet: document.getElementById("snailbait_background_3"),
      sourcePosition: Vector2.Zero,
      sourceDimensions: this.BACKGROUND_DIMENSIONS,
      translation: Vector2.Zero,
      rotation: 0,
      scale: Vector2.One,
      origin: Vector2.Zero,
      actorType: ActorType.Background,
      layerDepth: 0.15,
      scrollSpeedMultiplier: 0.1
    },
    {
      id: "Background 4",
      spriteSheet: document.getElementById("snailbait_background_4"),
      sourcePosition: Vector2.Zero,
      sourceDimensions: this.BACKGROUND_DIMENSIONS,
      translation: Vector2.Zero,
      rotation: 0,
      scale: Vector2.One,
      origin: Vector2.Zero,
      actorType: ActorType.Background,
      layerDepth: 0.2,
      scrollSpeedMultiplier: 0.05
    },
    {
      id: "Background 5",
      spriteSheet: document.getElementById("snailbait_background_5"),
      sourcePosition: Vector2.Zero,
      sourceDimensions: this.BACKGROUND_DIMENSIONS,
      translation: Vector2.Zero,
      rotation: 0,
      scale: Vector2.One,
      origin: Vector2.Zero,
      actorType: ActorType.Background,
      layerDepth: 0.25,
      scrollSpeedMultiplier: 0.01
    }
  ];

  static PLATFORM_DATA = {
    id: "Platform",
    spriteSheet: document.getElementById("snailbait_jungle_tileset"),
    sourcePosition: new Vector2(0, 112),
    sourceDimensions: new Vector2(48, 48),
    rotation: 0,
    scale: Vector2.One,
    origin: Vector2.Zero,
    actorType: ActorType.Platform,
    collisionType: CollisionType.NotCollidable,
    layerDepth: 0,
    explodeBoundingBoxInPixels: -6,
    translationArray: [

      // Bottom Left
      new Vector2(0, 420),
      new Vector2(50, 420),
      new Vector2(100, 420),

      // Middle Low
      new Vector2(200, 370),
      new Vector2(250, 370),
      new Vector2(300, 370),
      new Vector2(350, 370),

      // Middle High
      new Vector2(250, 240),
      new Vector2(300, 240),

      // Middle Right
      new Vector2(450, 300),
      new Vector2(500, 300),
      new Vector2(550, 300),
      new Vector2(600, 300),
    ]
  };
}

const FontType = {
  InformationSmall: "12px Arial",
  InformationMedium: "18px Arial",
  InformationLarge: "24px Arial"
};