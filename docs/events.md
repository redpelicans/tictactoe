# Events list

## Client events
> These events can be emitted from the client

### game:put piece
- name: `game:put piece`
- args: position(Number)
- source: **client**
- destination: service
- reaction: `game:your turn`(client) | `game:error`(client) | `game:end`(client) | `game:his turn`(client)
- description:

  Triggered when a client try to put a piece on the board
  if it's not his turn, we emit a `game:not your turn`
  
  else if the piece cannot be put where he asks we emit
  a `game:cannot put piece`
  
  else we put the piece on the board
  Now there is three possibility:
  - the board is full: we emit a `game:draw` to both players
  - there is a winner: we emit a `game:end` to both players
  - the game is not finished yet: we emit a `game:your turn` to the other player
---

### game:replay
- name: `game:replay`
- args: no
- source: **client**
- destination: service
- reaction: `start`(service)
- description:

  Triggered when the player is ready to restart the game
---

### game:join
- name: `game:join`
- args: id(String), player(String)
- source: **client**
- destination: service
- reaction: `game:joined`(client) | `game:error`(client) | `start`(service)
- description:

    Triggered when a user wants to join a game

    if the game does not exists, we create the game with
    the given id and the given player

    else if the game exists but is full,
    we set the player as spectator

    else we insert the player to the game,
    we emit `game:joined` to the client
    and we emit a `start` as a service
---

### game:ready
- name: `game:ready`
- args: no
- source: **client**
- destination: service
- reaction: 

## Connector events
> These events can be emitted from the connector

### game:joined
- name: `game:joined`
- args: id(String), me(Object), him(String)
- source: **service**
- destination: client
- reaction: no
- description:

    Triggered when a user join a game
---

### game:start
- name: `game:start`
- args: no
- source: **service**
- destination: client
- reaction: no-reaction
- description:

  Triggered when the game is ready to start.
  a `game:your turn` or `game:his turn` will be emitted soon
---

### game:your turn
- name: `game:your turn`
- args: no
- source: **service**
- destination: client
- reaction: no-reaction
- description:

  Triggered when the client has to put a piece on the
  board.
---

### game:his turn
- name: `game:your turn`
- args: no
- source: **service**
- destination: client
- reaction: no-reaction
- description:

  Triggered when the other player has to put a piece on the
  board.
---

### game:ready
- name: `game:ready`
- args: no
- source: **service**
- destination: client
- reaction: no-reaction
- description:

  Triggered when one of the players is ready to
  restart the game, it is emitted to the other one
---

### game:piece set
- name: `game:piece set`
- args: index(Number)
- source: **service**
- destination: client
- reaction: no-reaction
- description:

  Triggered when a piece has been set to a game board
---

### game:end
- name: `game:end`
- args: winner(Object)
- source: **service**
- destination: client
- reaction: no-reaction
- description:

  Triggered when the game is finished. If the game is full,
  winner is set to null.
  We can now waiting for a `game:replay` from both players
---

## Game events
> These events can be emitted from a Game

### start
- name: `start`
- args: no
- source: **service**
- destination: **service**
- reaction: `game:start`(client)
- description:

  Triggered by a game once all the players are ready
  We just emit a `game:start`
---

### left
- name: `left`
- args: no
- source: **service**
- destination: service
- reaction: `game:left`(client)
- description:

  Triggered when a client disconnects,
  we remove the player from the game
  
  if there is another player in the game we emit him
  `game:left`
  
  else we destroy the game
---

### joined
- name: `joined`
- args: id(String), me:(Object), him(Object)
- source: **service**
- destination: service
- reaction: `game:joined`(client)
- description:

  Triggered when a player has joined a game.
  We can emit a `game:joined` to all clients
---

### your turn
- name: `your turn`
- args: no
- source: **service**
- destination: service
- reaction: `game:your turn`(client) | `game:his turn`(client)
- description:

  Triggered by a game when a piece has been set but the game
  is not finished. We can emit a `game:your turn` or a `game:his turn`
  to the players
---

### piece set
- name: `piece set`
- args: index(Number)
- source: **service**
- destination: service
- reaction: `game:piece set`(client)
- description:

  Triggered when a player has set a piece.
  We can emit a `game:piece set` to all clients
---

### ready
- name: `ready`
- args: no
- source: **service**
- destination: service
- reaction: `game:ready`
- description

  Triggered when one of the players is ready

### end
- name: `end`
- args: winner(Object || null), message(String)
- source: **service**
- destination: service
- reaction: `game:end`(client)
- description:

  Triggered when the game is over.
  We can emit a `game:end` to all clients
