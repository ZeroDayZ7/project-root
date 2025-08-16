package logger

import (
	"os"

	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
	"gopkg.in/natefinch/lumberjack.v2"
)

type Logger struct {
    *zap.Logger
}

func NewLogger(env string) (*Logger, error) {
    var cfg zap.Config

    if env == "production" {
        cfg = zap.NewProductionConfig()
        cfg.OutputPaths = []string{"stdout"}
    } else {
        cfg = zap.NewDevelopmentConfig()
        cfg.EncoderConfig.EncodeLevel = zapcore.CapitalColorLevelEncoder
        cfg.OutputPaths = []string{"stdout"}
    }

    // Rotowanie plików
    lumberjackLogger := &lumberjack.Logger{
        Filename:   "logs/app.log",
        MaxSize:    10, // MB
        MaxBackups: 5,  // Maksymalna liczba starych plików
        MaxAge:     7,  // Dni
        Compress:   true,
    }

    fileCore := zapcore.NewCore(
        zapcore.NewJSONEncoder(cfg.EncoderConfig),
        zapcore.AddSync(lumberjackLogger),
        zapcore.InfoLevel,
    )

    core := zapcore.NewTee(
        zapcore.NewCore(
            zapcore.NewConsoleEncoder(cfg.EncoderConfig),
            zapcore.AddSync(os.Stdout),
            zapcore.DebugLevel,
        ),
        fileCore,
    )

    logger := zap.New(core, zap.AddCaller(), zap.AddStacktrace(zapcore.ErrorLevel))
    return &Logger{logger}, nil
}

func (l *Logger) Info(msg string, fields ...zap.Field) {
    l.Logger.Info(msg, fields...)
}

func (l *Logger) Error(msg string, fields ...zap.Field) {
    l.Logger.Error(msg, fields...)
}

func (l *Logger) Debug(msg string, fields ...zap.Field) {
    l.Logger.Debug(msg, fields...)
}

func (l *Logger) Warn(msg string, fields ...zap.Field) {
    l.Logger.Warn(msg, fields...)
}