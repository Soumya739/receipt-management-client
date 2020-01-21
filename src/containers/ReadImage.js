import React, { Component } from 'react'
import axios from 'axios';

// this component has't been used anywhere.
export class ReadImage extends Component {
    processImage = (sourceImageUrl) => {
        let subscriptionKey = "key";
        let endpoint = "endpoint";
        if (!subscriptionKey) {
            throw new Error('Set your environment variables for your subscription key and endpoint.');
        }
        let uriBase = endpoint + "vision/v2.1/ocr";

        axios({
            method: "post",
            url: uriBase + "?" + { "language": "unk", "detectOrientation": "true" },
            data: `{url: ${sourceImageUrl}}`,
            headers: {
                "Content-Type": "application/json",
                "Ocp-Apim-Subscription-Key": subscriptionKey
            }
        })
            .then(resp => resp.json())
            .then(data => console.log(data))
    };

    render() {
        if (this.props.hasImage) {
            return (
                <div>
                    {this.processImage(this.props.image)}
                </div>
            )
        } else {
            return (
                <div>
                    <h1>In ReadImage: no image</h1>
                </div>
            )
        }
    }
}

export default ReadImage
