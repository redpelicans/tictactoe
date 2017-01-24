# Events list

## Client events
> These events can be emitted from the client

### game:put a piece
- name: `game:put a piece`
- args: position(Number), id(Number), player(Object)
- source: **client**
- destination: service
- reaction: `game:your turn`(client) | `game:not your turn`(client) | `game:draw`(client) | `game:end`(client)
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
- args: id(Number), me(Object)
- source: **client**
- destination: service
- reaction: no-reaction
- description:

  Triggered when the player is ready to restart the game
  if both players are ready, we emit a `game:your turn` to one
  of the player and we clear the board
---

### game:join
- name: `game:join`
- args: id(String), player(String)
- source: **client**
- destination: multiple
- reaction: `game:create`(service) | `game:joined`(client) | `game:full`(client)
- description:

    Triggered when a user wants to join a game  

    if the game does not exists, we fire a `game:create`
    to create a game with the id

    else if the game exists but is full,
    we emit a `game:full` to the client

    else we insert the player to the game,
    we emit `game:joined` to the client
    and we emit a `game:start` as a service
---

## Service events
> These events can be emitted from any services

### game:create
- name: `game:create`
- args: id(String), Player(String)
- source: **service**
- destination: client
- reaction: `game:joined`(client)
- description:

    Triggered when a client has emitted a `game:join`
    but the game does not exists yet.
    We create the game, put the player in and emit to
    the client a `game:join`
---

### game:joined
- name: `game:join`
- args: board(Array), me(Object), him(String)
- source: **service**
- destination: client
- reaction: no
- description:

    Triggered when the user is connected to a game
    He can now setup the `game:your turn` event
    to play when it is his turn
---

### game:full
- name: `game:full`
- args: errorMessage(String)
- source: **service**
- destination: client
- reaction: no-reaction
- description:
    
    Triggered when a user has asked to join a
    game and the game is full
---

### game:your turn
- name: `game:your turn`
- args: board(Array)
- source: **service**
- destination: client
- reaction: no-reaction
- description:

  Triggered when the client have to put a piece on the
  board. We can now setup the `game: put a piece`
---

### game:draw
- name `game:draw`
- args: no
- source: **service**
- destination: client
- reaction: no-reaction
- description:

  Triggered when the board is full, both players have to
  emit a `game:replay` to restart the game
---

### game:end
- name: `game:end`
- args: winner(Object)
- source: **service**
- destination: client
- reaction: no-reaction
- description:

  Triggered when the game is ended because we have a winner.
  We can now waiting for a `game:replay` from both players
---

### game:cannot put a piece
- name: `game:cannot put a piece`
- args: no
- source: **service**
- destination: client
- reaction: no-reaction
- description:

  Triggered when the client has tried to put a piece but she cannot
  be put where he ask for some reason
---

### game:leaving
- name: `game:leaving`
- args: no
- source: **service**
- destination: client
- reaction: no-reaction
- description:

  Triggered when the other player has left the game
---

### game:leave
- name: `game:leave`
- args: id(Number), player(Object)
- source: **service**
- destination: service
- reaction: `game:leaving(client)`
- description:

  Triggered when a client disconnects,
  we remove the player from the game
  
  if there is another player in the game we emit him
  `game:leaving`
  
  else we destroy the game
