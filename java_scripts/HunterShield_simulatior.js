// Wait for the DOM to be fully loaded
    // Get references to the canvas and context
    var canvas, ctx;
    var numPoints, x_pos, y_pos, hunter_idx, shield_idx;
    var min_dist = 5;
    var step_size = 1;
    function main() {
        canvas = document.getElementById('gameCanvas');
        ctx = canvas.getContext('2d');
        drawPoints(5);
    }
    // Function to draw points in a circle
    // Function to draw points in a circle
    function drawPoints(input_numPoints) {
        numPoints = Math.max(3, Math.min(input_numPoints, 50));
        // Fill the canvas with a white background
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Variables for the circle
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = Math.min(centerX, centerY) * 0.8;

        //initiate x_pos, y_pos as lists
        x_pos = [];
        y_pos = [];
        hunter_idx = [];
        shield_idx = [];

        // Draw each point
        for (let i = 0; i < numPoints; i++) {
            // Calculate angle for this point
            const angle = (i / numPoints) * 2 * Math.PI;

            // Calculate x, y coordinate of the point
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
            if (shield_index >= i) {
                shield_index += 1;
            }
            if (shield_index >= hunter_index) {
                shield_index += 1;
            }
            shield_idx.push(shield_index);
            // Draw the point as a small circle
            ctx.beginPath();
            ctx.arc(x, y, 5, 0, 2 * Math.PI); // Small circle with radius 5
            ctx.fillStyle = 'black';
            ctx.fill();
        }
    }

    function check_colisions(new_x,new_y,idx) {
        //check if new position is within the bounds of the canvas
        if (new_x < 0 || new_x > canvas.width || new_y < 0 || new_y > canvas.height) {
            return false;
        }
        //check wether the new position is too close to another point
        for (let i = 0; i < numPoints; i++) {
            if (i != idx) {
                if (Math.sqrt(Math.pow(new_x - x_pos[i], 2) + Math.pow(new_y - y_pos[i], 2)) < min_dist) {
                    return false;
                }
            }
        }
    }
    function find_preferred_position(idx) {
        var my_x = x_pos[idx]
        var my_y = y_pos[idx]

        var hunter_x = x_pos[hunter_idx[idx]]
        var hunter_y = y_pos[hunter_idx[idx]]

        var shield_x = x_pos[shield_idx[idx]]
        var shield_y = y_pos[shield_idx[idx]]

        var vector_hunter_to_shield_nromed = [shield_x - hunter_x, shield_y - hunter_y] / Math.sqrt(Math.pow(shield_x - hunter_x, 2) + Math.pow(shield_y - hunter_y, 2));
        var vector_me_to_shield = [shield_x - my_x, shield_y - my_y];

        //check wether dotproduct is positive
        var dotproduct = vector_hunter_to_shield[0] * vector_me_to_shield[0] + vector_hunter_to_shield_nromed[1] * vector_hunter_to_shield_nromed[1];

        if (dotproduct > 0) {
            goal_point = [shield_x + vector_hunter_to_shield_normed[0] * min_dist, 
                          shield_y + vector_hunter_to_shield_normed[1] * min_dist];
        } else {
            goal_point = [shield_x - vector_hunter_to_shield_normed[0] * dotproduct, 
                          shield_y - vector_hunter_to_shield_normed[1] * dotproduct];
        }
        

        next_x = my_x + step_size * (goal_point[0] - my_x) / Math.sqrt(Math.pow(goal_point[0] - my_x, 2) + Math.pow(goal_point[1] - my_y, 2));
        next_y = my_y + step_size * (goal_point[1] - my_y) / Math.sqrt(Math.pow(goal_point[0] - my_x, 2) + Math.pow(goal_point[1] - my_y, 2));

        return [next_x, next_y];
    }

    function move_points() {
        for (let i = 0; i < numPoints; i++) {
            var new_x, new_y;
            [new_x, new_y] = find_preferred_position(i);
            if (check_colisions(new_x, new_y, i)) {
                x_pos[i] = new_x;
                y_pos[i] = new_y;
            }
        }
    }


