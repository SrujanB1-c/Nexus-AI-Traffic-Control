import tensorflow as tf
from tensorflow.keras import layers

def build_model():

    model = tf.keras.Sequential([

        layers.LSTM(
            64,
            return_sequences=True
        ),

        layers.LSTM(32),

        layers.Dense(16),

        layers.Dense(1)

    ])

    model.compile(
        optimizer="adam",
        loss="mse"
    )

    return model