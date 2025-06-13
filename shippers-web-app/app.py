import joblib
import pandas as pd

print('Loading Model...')
model = joblib.load('model/predictor.pkl')
transformer = joblib.load('model/transformer.pkl') 
print('Model Loaded!')

sample_data = {
    'category': ["clothing"],
    'weight': [21]
}

input_df = pd.DataFrame(sample_data)
transformed_X = transformer.transform(input_df)
pred = model.predict(transformed_X)
print("Predicted Shipping Cost: ", round(pred[0],2))
