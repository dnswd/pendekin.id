# Pendekin.id in Deno

## Installation
1. Download and install [Deno](https://deno.land/#installation) on your machine.
2. Open your desired console/terminal.
3. Make sure Deno is installed by typing `deno` on your console/terminal, it should opens up a JS REPL and information about your Deno. Press `ctrl+D` to exit the REPL.
4. Navigate to the root of this project
5. On your terminal, type `deno run -A mod.ts` to run the app.
6. ???
7. Profit!

## Assumptions
1. To exit the console, use `/exit` command.
2. URL hosts are checked to prevent different hostname.
3. If the urls already shortened, prints the previous shortened url.
4. Count view uses `/count` command, as specified in example.
5. There are two parameters to specify custom shortened URL according to the assignment, `desired` and `short_path`. I assume it's `short_path` because it's the one specified in the specification table. 

# Commands
| Command   | Description                                                     |
|-----------|-----------------------------------------------------------------|
| /shorten  | Shorten url operation                                           |
| /redirect | Redirects shortened link to the original, increment hit counter |
| /delete   | Deletes the shortened link inside DB                            |
| /count    | Count how many times shortened link has been redirected         |
| /exit     | Exit the app                                                    |

Have a nice day~  
(c) 2020, Dennis A. Walangadi
