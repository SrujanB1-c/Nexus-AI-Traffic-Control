import torch
import torch.nn as nn

class TransformerPredictor(
    nn.Module
):

    def __init__(self):

        super().__init__()

        self.encoder = nn.TransformerEncoder(

                nn.TransformerEncoderLayer(
                    d_model=64,
                    nhead=8
                ),

                num_layers=3
            )

    def forward(
        self,
        x
    ):

        return self.encoder(x)