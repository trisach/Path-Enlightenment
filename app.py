from flask import Flask, jsonify, send_from_directory, request
import csv
import os

app = Flask(__name__)

# Define the directory where uploaded files will be saved
UPLOAD_FOLDER = 'IPFS_File_upload(new)/processed'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def run_algorithm(filename):
    # Your Python algorithm code goes here
    # Replace this placeholder code with your algorithm
    import csv

    def distance(p1, p2):
        dist = pow((pow((p1[1] - p2[1]), 2) + pow((p1[2] - p2[2]), 2)), 0.5)
        return abs(dist)

    data = []

    with open(filename, "r") as csvfile:
        reader = csv.reader(csvfile)
        next(reader)
        for row in reader:
            x = float(row[0])
            y = float(row[1])
            z = float(row[2])
            data.append([x, y, z])

    print("List of data created")
    n = len(data)
    marker = [0] * n

    output = []

    minw = 1000
    maxout = 3
    i = 0

    while i < n:
        simi = 0
        counter = 0
        prev_data = data[i]

        for k in range(i + 1, i + minw + 1):
            if k < n:
                simi += distance(prev_data, data[k])
                counter += 1
                prev_data = data[k]
            else:
                break

        simi /= counter
        count = 1
        outcount = 0
        j = i + 1
        while j < n:
            if distance(data[i], data[j]) <= simi:
                j += 1
                count += 1
                outcount = 0
            else:
                check_out = j
                next_i = i + 1
                while next_i < check_out:
                    if marker[next_i] != -2 and distance(data[next_i], data[check_out]) <= simi:
                        j += 1
                        count += 1
                        outcount = 0
                        break
                    next_i += 1
                if next_i == check_out:  # if no breaks in while loop -> no outliers
                    outcount += 1
                    marker[check_out] = -2

                    if outcount == 1:
                        track = j  # store for backtracking, if applicable, and continue
                        j += 1
                        count += 1
                    elif outcount <= maxout:
                        j += 1
                        count += 1
                    elif outcount > maxout:
                        for k in range(track, j + 1):
                            marker[k] = 0
                        count -= 3

                        if count >= minw:
                            j = check_out = track
                            segment = (i, j)
                            output.append((i, j))  # Append the segment to the output list

                            for k in range(i, j):
                                if marker[k] != -2:
                                    marker[k] = 1
                            i = next_i
                            break
                        else:
                            j = check_out = track

                            for k in range(i, j):
                                if marker[k] != -2:
                                    marker[k] = -1

                            i = check_out
                            break

        if j == n:
            if count >= minw:
                for k in range(i, j):
                    if marker[k] != -2:
                        marker[k] = 1
            else:
                for k in range(i, j):
                    if marker[k] != -2:
                        marker[k] = -1
            break

    print("Writing output in a CSV file")

    result_filename = os.path.join(app.config['UPLOAD_FOLDER'], "processed_file.csv")
    with open(result_filename, "w", newline="") as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow(["Start", "End"])
        writer.writerows(output)
    print("Processed file is created")
    return result_filename

@app.route('/', methods=['GET'])
def home():
    return 'Welcome to the Python Algorithm Runner'

@app.route('/process', methods=['POST'])
def process():
    if 'csv_file' not in request.files:
        return jsonify({"error": "No file part"})

    file = request.files['csv_file']

    if file.filename == '':
        return jsonify({"error": "No selected file"})

    if file:
        # Save the uploaded file to the uploads folder with a fixed name, e.g., 'uploaded_file.csv'
        filename = os.path.join(app.config['UPLOAD_FOLDER'], 'uploaded_file.csv')
        file.save(filename)
        result_file = run_algorithm(filename)
        return jsonify({"result": result_file})

@app.route('/runalgo.html', methods=['GET'])
def serve_html():
    return send_from_directory('static', 'runalgo.html')

if __name__ == '__main__':
    app.run()