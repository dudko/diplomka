import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
from matplotlib import cm
import plotly
import plotly.graph_objs as go
import plotly.plotly as py


import sys


def point_on_sphere():
    i = 0
    j = 0
    k = 0

    while True:
        u = np.random.random() * (1 if np.random.random() < 0.5 else -1)
        v = np.random.random() * (1 if np.random.random() < 0.5 else -1)

        if ((u * u) + (v * v) >= 1):
            continue

        i = 2 * u * np.sqrt(1 - (u * u) - (v * v))
        j = 2 * v * np.sqrt(1 - (u * u) - (v * v))
        k = 1 - (2 * ((u * u) + (v * v)))

        return [i, j, k]


# Matrices used for faster tensor operations
MI = [[0, 5, 4], [5, 1, 3], [4, 3, 2]]
MK = [[1, 0.5, 0.5], [0.5, 1, 0.5], [0.5, 0.5, 1]]


Fe = """
    151	129	129	0	0	0;
    129	151	129	0	0	0;
    129	129	151	0	0	0;
    0	0	0	29	0	0;
    0	0	0	0	29	0;
    0	0	0	0	0	29
"""

tensors = np.matrix(Fe)

S = tensors.I

s = [[
    [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
    [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
    [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
],
    [
    [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
    [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
    [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
],
    [
    [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
    [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
    [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
]]

for i in range(0, 3):
    for j in range(0, 3):
        for k in range(0, 3):
            for l in range(0, 3):
                m = MI[i][j]
                n = MI[k][l]
                s[i][j][k][l] = MK[i][j] * MK[k][l] * S.item(m, n)

x = []
y = []
z = []
youngs = []
compress = []

total_count = 20000
counter = 0
while counter < total_count:
    counter += 1
    [u, v, w] = point_on_sphere()
    A = [[0, 0, u], [0, 0, v], [0, 0, w]]

    sum_young = 0
    sum_compress = 0

    for i in range(0, 3):
        for j in range(0, 3):
            for k in range(0, 3):
                sum_compress += A[i][2] * A[j][2] * s[i][j][k][k]
                for l in range(0, 3):
                    sum_young += A[i][2] * A[j][2] * \
                        A[k][2] * A[l][2] * s[i][j][k][l]

    Y = np.round(np.abs(1 / sum_young) * 100) / 100
    youngs.append(Y)
    x.append(u * Y)
    y.append(v * Y)
    z.append(w * Y)

    # compress.append(sum_compress * 1000)
    # print((i, j, k), np.round(np.abs(1 / sum_young) * 100) / 100)


# def modify(x=None, y=None, z=None):
#     newX = np.copy(x)
#     newY = np.copy(y)
#     newZ = np.copy(z)
#     for i in range(len(x)):
#         for j in range(len(x)):
#             val = [x[i][j], y[i][j], z[i][j]]
#             newVal = np.dot(prod(val), val)
#             newX[i][j] = newVal[0]
#             newY[i][j] = newVal[1]
#             newZ[i][j] = newVal[2]
#     return newX, newY, newZ


# [x, y, z] = modify(x, y, z)

fig = plt.figure()
ax = fig.add_subplot(111, projection='3d')
ax.scatter(x, y, z, s=50, c=youngs, cmap=cm.jet, linewidth='0')

# fig.show()
trace1 = go.Scatter3d(
    x=x,
    y=y,
    z=z,
    mode='markers',
    marker=dict(
        size='12',
        color=youngs,
        colorscale='Jet'
    )
)
data = [trace1]

plotly.offline.plot(data)


raw_input()
