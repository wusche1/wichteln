// Wait for the DOM to be fully loaded
// Get references to the canvas and context
var canvas, ctx;
var numPoints, x_pos, y_pos, hunter_idx, shield_idx;
var min_dist = 10;
var step_size = 1;
var movement_possible = true;

function main() {
    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');
    initiatePositions(5);
    drawPoints();
}

// Function to initiate positions
function initiatePositions(input_numPoints) {
    numPoints = Math.max(3, Math.min(input_numPoints, 50));
    // Variables for the circle
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) * 0.8;

    movement_possible = true;

    //initiate x_pos, y_pos as lists
    x_pos = [];
    y_pos = [];
    hunter_idx = [];
    shield_idx = [];

    // Calculate and store x, y coordinates for each point
    for (let i = 0; i < numPoints; i++) {
        const angle = (i / numPoints) * 2 * Math.PI;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        x_pos.push(x);
        y_pos.push(y);
        //Draw a random index not equal to i for hunter
        var hunter_index = Math.floor(Math.random() * (numPoints - 1));
        if (hunter_index >= i) {
            hunter_index += 1;
        }
        hunter_idx.push(hunter_index);
        //Draw a random index not equal to i or hunter_index for shield
        var shield_index = Math.floor(Math.random() * (numPoints - 2));

        if (hunter_index >= i) {
            if (shield_index >= i) {
                shield_index += 1;
            }
            if (shield_index >= hunter_index) {
                shield_index += 1;
            }
        } else {
            if (shield_index >= hunter_index) {
                shield_index += 1;
            }
            if (shield_index >= i) {
                shield_index += 1;
            }
            
        }
        shield_idx.push(shield_index);
    }
    console.log(hunter_idx);
    console.log(shield_idx);
}

// Function to draw points on the canvas
function drawPoints() {
    // Fill the canvas with a white background
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw each point
    for (let i = 0; i < numPoints; i++) {
        const x = x_pos[i];
        const y = y_pos[i];

        // Draw the point as a small circle
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, 2 * Math.PI); // Small circle with radius 5
        ctx.fillStyle = 'black';
        ctx.fill();
    }
}

function reset(new_numPoints) {
    numPoints = Math.max(3, Math.min(new_numPoints, 50));
    initiatePositions(numPoints);
    drawPoints();
}

function check_colisions(new_x, new_y, idx) {
    //check if new position is within the bounds of the canvas
    if (new_x < 0 || new_x > canvas.width || new_y < 0 || new_y > canvas.height) {
        return false;
    }
    //check whether the new position is too close to another point
    for (let i = 0; i < numPoints; i++) {
        if (i != idx) {
            if (Math.sqrt(Math.pow(new_x - x_pos[i], 2) + Math.pow(new_y - y_pos[i], 2)) < min_dist) {
                return false;
            }
        }
    }
    return true;
}

function find_preferred_position(idx) {
    var my_x = x_pos[idx]
    var my_y = y_pos[idx]

    var hunter_x = x_pos[hunter_idx[idx]]
    var hunter_y = y_pos[hunter_idx[idx]]

    var shield_x = x_pos[shield_idx[idx]]
    var shield_y = y_pos[shield_idx[idx]]

    var magnitude = Math.sqrt(Math.pow(shield_x - hunter_x, 2) + Math.pow(shield_y - hunter_y, 2));
    var vector_hunter_to_shield_normed = [(shield_x - hunter_x) / magnitude, (shield_y - hunter_y) / magnitude];
    var vector_me_to_shield = [shield_x - my_x, shield_y - my_y];

    //check whether dot product is positive
    var dotproduct = vector_me_to_shield[0] * vector_hunter_to_shield_normed[0] + vector_me_to_shield[1] * vector_hunter_to_shield_normed[1];


    // console.log("dotproduct: " + dotproduct);
    // console.log("vector_me_to_shield: " + vector_me_to_shield);
    // console.log("vector_hunter_to_shield_normed: " + vector_hunter_to_shield_normed);
    
    if (dotproduct > 0) {
        goal_point = [shield_x + vector_hunter_to_shield_normed[0] * min_dist,
            shield_y + vector_hunter_to_shield_normed[1] * min_dist
        ];
    } else {
        goal_point = [shield_x - vector_hunter_to_shield_normed[0] * dotproduct,
            shield_y - vector_hunter_to_shield_normed[1] * dotproduct
        ];
    }

    //if distnace to goal point is smaller than step size, move to goal point
    if (Math.sqrt(Math.pow(goal_point[0] - my_x, 2) + Math.pow(goal_point[1] - my_y, 2)) < step_size) {
        return goal_point;
    }

    new_x = my_x + (goal_point[0] - my_x) / Math.sqrt(Math.pow(goal_point[0] - my_x, 2) + Math.pow(goal_point[1] - my_y, 2)) * step_size;
    new_y = my_y + (goal_point[1] - my_y) / Math.sqrt(Math.pow(goal_point[0] - my_x, 2) + Math.pow(goal_point[1] - my_y, 2)) * step_size;

    return [new_x, new_y];
}

function move_points() {
    var any_movement = false;
    for (let i = 0; i < numPoints; i++) {
        var new_x, new_y;
        arr = find_preferred_position(i);
        new_x = arr[0];
        new_y = arr[1];
        if (check_colisions(new_x, new_y, i)) {
            if (x_pos[i] != new_x || y_pos[i] != new_y) {
                any_movement = true;
            }
            x_pos[i] = new_x;
            y_pos[i] = new_y;
        }
    } 
    if (!any_movement) {
        console.log("No more movement possible");
        movement_possible = false;
    }
}

function make_step() {
    console.log(x_pos);
    console.log(y_pos);
    move_points();
    drawPoints();
    // console.log(x_pos);
    // console.log(y_pos);
}

function move() {
    if (movement_possible) {
        make_step();
        setTimeout(move, 10);
    }
}


