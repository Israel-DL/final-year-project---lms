import pickle
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

courses_list = pickle.load(open("courses.pkl", "rb"))
similarity = pickle.load(open("similarity.pkl", "rb"))


def recommend(course):
    index = courses_list[courses_list["Title"] == course].index[0]
    distances = sorted(
        list(enumerate(similarity[index])), reverse=True, key=lambda x: x[1]
    )
    recommended_course_names = []
    for i in distances[1:7]:
        course_name = courses_list.iloc[i[0]]["Title"]
        recommended_course_names.append(course_name)

    return recommended_course_names


@app.route("/recommend", methods=["POST"])
def recommend_endpoint():
    course = request.json["course"]
    recommended_courses = recommend(course)
    return jsonify({"courses": recommended_courses})


if __name__ == "__main__":
    app.run(debug=True)
