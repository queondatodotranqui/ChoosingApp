'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ChoosingApp = function (_React$Component) {
    _inherits(ChoosingApp, _React$Component);

    function ChoosingApp(props) {
        _classCallCheck(this, ChoosingApp);

        var _this = _possibleConstructorReturn(this, (ChoosingApp.__proto__ || Object.getPrototypeOf(ChoosingApp)).call(this, props));

        _this.state = {
            options: []
        };

        _this.deleteOptions = _this.deleteOptions.bind(_this);
        _this.addOptions = _this.addOptions.bind(_this);
        _this.handlePick = _this.handlePick.bind(_this);
        _this.handleDeleteOption = _this.handleDeleteOption.bind(_this);
        return _this;
    }

    _createClass(ChoosingApp, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            try {
                var options = JSON.parse(localStorage.getItem('options'));

                this.setState(function () {
                    return { options: options };
                });
            } catch (e) {
                console.log('Error:', e);
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {
            if (prevState.options.length !== this.state.options.length) {
                var json = JSON.stringify(this.state.options);
                localStorage.setItem('options', json);
                console.log('saving data');
            }
        }
    }, {
        key: 'deleteOptions',
        value: function deleteOptions() {
            this.setState(function () {
                return { options: [] };
            });
        }
    }, {
        key: 'addOptions',
        value: function addOptions(data) {
            if (!data) {
                return 'Empty value';
            } else if (this.state.options.includes(data)) {
                return 'Already exists';
            }

            this.setState(function (prevState) {
                return { options: prevState.options.concat(data) };
            });
        }
    }, {
        key: 'handlePick',
        value: function handlePick() {
            var number = Math.floor(Math.random() * this.state.options.length);
            alert(this.state.options[number]);
            this.deleteOptions();
        }
    }, {
        key: 'handleDeleteOption',
        value: function handleDeleteOption(option) {
            this.setState(function (prevState) {
                return { options: prevState.options.filter(function (item) {
                        return item != option;
                    }) };
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var options = this.state.options;


            return React.createElement(
                'div',
                { className: 'container-fluid contenedor' },
                React.createElement(Header, null),
                React.createElement(
                    'div',
                    { className: 'box' },
                    React.createElement(Action, {
                        handlePick: this.handlePick,
                        hasOptions: options.length > 0,
                        'delete': this.deleteOptions
                    }),
                    React.createElement(AddOption, { addOptions: this.addOptions }),
                    React.createElement(Options, { data: options, 'delete': this.handleDeleteOption })
                )
            );
        }
    }]);

    return ChoosingApp;
}(React.Component);

var Header = function Header(props) {
    return React.createElement(
        'div',
        { className: 'header' },
        React.createElement(
            'h1',
            null,
            props.title
        )
    );
};

Header.defaultProps = {
    title: 'What do we eat?'
};

var Action = function Action(props) {
    return React.createElement(
        'div',
        { className: 'makeD' },
        React.createElement(
            'button',
            { className: 'btn btn-success', disabled: !props.hasOptions, onClick: props.handlePick },
            'Make decision'
        ),
        React.createElement(
            'button',
            { onClick: props.delete, disabled: !props.hasOptions, className: 'btn btn-danger' },
            'Remove All'
        )
    );
};

var Options = function Options(props) {
    return React.createElement(
        'div',
        { className: 'options' },
        props.data && props.data.map(function (item) {
            return React.createElement(Option, {
                'delete': props.delete,
                key: item,
                data: item
            });
        })
    );
};

var Option = function Option(props) {
    return React.createElement(
        'div',
        { className: 'option' },
        React.createElement(
            'div',
            null,
            props.data
        ),
        React.createElement(
            'button',
            { onClick: function onClick(e) {
                    props.delete(props.data);
                }, className: 'btn btn-danger' },
            '\u274C'
        )
    );
};

var AddOption = function (_React$Component2) {
    _inherits(AddOption, _React$Component2);

    function AddOption(props) {
        _classCallCheck(this, AddOption);

        var _this2 = _possibleConstructorReturn(this, (AddOption.__proto__ || Object.getPrototypeOf(AddOption)).call(this, props));

        _this2.state = {
            error: undefined
        };
        return _this2;
    }

    _createClass(AddOption, [{
        key: 'render',
        value: function render() {
            var _this3 = this;

            var error = this.state.error;

            return React.createElement(
                'form',
                { className: 'addOption', onSubmit: function onSubmit(e) {
                        e.preventDefault();

                        var option = e.target.elements.option.value.trim();
                        var Error = _this3.props.addOptions(option);

                        _this3.setState(function () {
                            return { error: Error };
                        });

                        e.target.elements.option.value = '';
                    } },
                React.createElement(
                    'div',
                    { className: 'form-group d-flex' },
                    error && React.createElement(
                        'p',
                        null,
                        error
                    ),
                    React.createElement('input', { type: 'text', placeholder: 'Food...', name: 'option', style: { width: '75%', padding: '15px' } }),
                    React.createElement(
                        'button',
                        { type: 'submit', className: 'btn btn-primary', style: { width: '25%' } },
                        'Add'
                    )
                )
            );
        }
    }]);

    return AddOption;
}(React.Component);

ReactDOM.render(React.createElement(ChoosingApp, null), document.getElementById('root'));
